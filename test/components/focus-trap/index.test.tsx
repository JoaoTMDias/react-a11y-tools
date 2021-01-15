/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2021 joaodias.me, No Rights Reserved.
 */

import { act, fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ReactDOM from "react-dom";
import { FocusTrap, useFocusManager } from "../../../src/components/focus-trap/index";

describe("FocusTrap", () => {
	beforeEach(() => {
		// @ts-ignore
		jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => cb());
	});

	afterEach(() => {
		// @ts-ignore
		window.requestAnimationFrame.mockRestore();
	});

	describe("focus containment", () => {
		it("should contain focus within the scope", () => {
			const { getByTestId } = render(
				<FocusTrap contain>
					<input data-testid="input1" />
					<input data-testid="input2" />
					<input data-testid="input3" />
				</FocusTrap>,
			);

			const input1 = getByTestId("input1");
			const input2 = getByTestId("input2");
			const input3 = getByTestId("input3");

			act(() => {
				input1.focus();
			});
			expect(document.activeElement).toBe(input1);

			userEvent.tab();
			expect(document.activeElement).toBe(input2);

			userEvent.tab();

			expect(document.activeElement).toBe(input3);

			userEvent.tab();

			expect(document.activeElement).toBe(input1);

			userEvent.tab({
				shift: true,
			});
			expect(document.activeElement).toBe(input3);

			userEvent.tab({
				shift: true,
			});

			expect(document.activeElement).toBe(input2);

			userEvent.tab({
				shift: true,
			});

			expect(document.activeElement).toBe(input1);
		});

		it("should work with nested elements", () => {
			const { getByTestId } = render(
				<FocusTrap contain>
					<input data-testid="input1" />
					<div>
						<input data-testid="input2" />
						<div>
							<input data-testid="input3" />
						</div>
					</div>
				</FocusTrap>,
			);

			const input1 = getByTestId("input1");
			const input2 = getByTestId("input2");
			const input3 = getByTestId("input3");

			act(() => {
				input1.focus();
			});
			expect(document.activeElement).toBe(input1);

			userEvent.tab();
			expect(document.activeElement).toBe(input2);

			userEvent.tab();
			expect(document.activeElement).toBe(input3);

			userEvent.tab();
			expect(document.activeElement).toBe(input1);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input3);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input2);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input1);
		});

		it("should skip non-tabbable elements", () => {
			const { getByTestId } = render(
				<FocusTrap contain>
					<input data-testid="input1" />
					<div />
					<input data-testid="input2" />
					<div tabIndex={-1} />
					<input data-testid="input3" />
				</FocusTrap>,
			);

			const input1 = getByTestId("input1");
			const input2 = getByTestId("input2");
			const input3 = getByTestId("input3");

			act(() => {
				input1.focus();
			});
			expect(document.activeElement).toBe(input1);

			userEvent.tab();
			expect(document.activeElement).toBe(input2);

			userEvent.tab();
			expect(document.activeElement).toBe(input3);

			userEvent.tab();
			expect(document.activeElement).toBe(input1);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input3);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input2);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input1);
		});

		it("should do nothing if a modifier key is pressed", () => {
			const { getByTestId } = render(
				<FocusTrap contain>
					<input data-testid="input1" />
					<input data-testid="input2" />
					<input data-testid="input3" />
				</FocusTrap>,
			);

			const input1 = getByTestId("input1");

			act(() => {
				input1.focus();
			});
			expect(document.activeElement).toBe(input1);

			fireEvent.keyDown(input1, { key: "Tab", altKey: true });
			expect(document.activeElement).toBe(input1);
		});

		it("should work with multiple focus scopes", () => {
			const { getByTestId } = render(
				<div>
					<FocusTrap contain>
						<input data-testid="input1" />
						<input data-testid="input2" />
						<input data-testid="input3" />
					</FocusTrap>
					<FocusTrap contain>
						<input data-testid="input4" />
						<input data-testid="input5" />
						<input data-testid="input6" />
					</FocusTrap>
				</div>,
			);

			const input1 = getByTestId("input1");
			const input2 = getByTestId("input2");
			const input3 = getByTestId("input3");
			const input4 = getByTestId("input4");
			const input5 = getByTestId("input5");
			const input6 = getByTestId("input6");

			act(() => {
				input1.focus();
			});
			expect(document.activeElement).toBe(input1);

			userEvent.tab();
			expect(document.activeElement).toBe(input2);

			userEvent.tab();
			expect(document.activeElement).toBe(input3);

			userEvent.tab();
			expect(document.activeElement).toBe(input1);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input3);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input2);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input1);

			act(() => {
				input4.focus();
			});
			expect(document.activeElement).toBe(input4);

			userEvent.tab();
			expect(document.activeElement).toBe(input5);

			userEvent.tab();
			expect(document.activeElement).toBe(input6);

			userEvent.tab();
			expect(document.activeElement).toBe(input4);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input6);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input5);

			userEvent.tab({ shift: true });
			expect(document.activeElement).toBe(input4);
		});

		it("uses document.activeElement instead of e.relatedTarget on blur to determine if focus is still in scope", () => {
			const { getByTestId } = render(
				<div>
					<FocusTrap contain>
						<input data-testid="input1" />
						<input data-testid="input2" />
					</FocusTrap>
				</div>,
			);

			const input1 = getByTestId("input1");
			const input2 = getByTestId("input2");

			act(() => {
				input1.focus();
			});
			fireEvent.focusIn(input1); // jsdom doesn't fire this automatically
			expect(document.activeElement).toBe(input1);

			act(() => {
				// set document.activeElement to input2
				input2.focus();
				// if onBlur didn't fallback to checking document.activeElement, this would reset focus to input1
				fireEvent.blur(input1, { relatedTarget: null });
			});

			expect(document.activeElement).toBe(input2);
		});
	});

	describe("focus restoration", () => {
		it("should restore focus to the previously focused node on unmount", () => {
			function Test({ show }: { show?: boolean }) {
				return (
					<div>
						<input data-testid="outside" />
						{show && (
							<FocusTrap restoreFocus autoFocus>
								<input data-testid="input1" />
								<input data-testid="input2" />
								<input data-testid="input3" />
							</FocusTrap>
						)}
					</div>
				);
			}

			const { getByTestId, rerender } = render(<Test />);

			const outside = getByTestId("outside");
			act(() => {
				outside.focus();
			});

			rerender(<Test show />);

			const input1 = getByTestId("input1");
			expect(document.activeElement).toBe(input1);

			rerender(<Test />);

			expect(document.activeElement).toBe(outside);
		});

		it("should move focus to the next element after the previously focused node on Tab", () => {
			function Test({ show }: { show?: boolean }) {
				return (
					<div>
						<input data-testid="before" />
						<button data-testid="trigger" />
						<input data-testid="after" />
						{show && (
							<FocusTrap restoreFocus autoFocus>
								<input data-testid="input1" />
								<input data-testid="input2" />
								<input data-testid="input3" />
							</FocusTrap>
						)}
					</div>
				);
			}

			const { getByTestId, rerender } = render(<Test />);

			const trigger = getByTestId("trigger");
			act(() => {
				trigger.focus();
			});

			rerender(<Test show />);

			const input1 = getByTestId("input1");
			expect(document.activeElement).toBe(input1);

			const input3 = getByTestId("input3");
			act(() => {
				input3.focus();
			});

			fireEvent.keyDown(input3, { key: "Tab" });
			expect(document.activeElement).toBe(getByTestId("after"));
		});

		it("should move focus to the previous element after the previously focused node on Shift+Tab", () => {
			function Test({ show }: { show?: boolean }) {
				return (
					<div>
						<input data-testid="before" />
						<button data-testid="trigger" />
						<input data-testid="after" />
						{show && (
							<FocusTrap restoreFocus autoFocus>
								<input data-testid="input1" />
								<input data-testid="input2" />
								<input data-testid="input3" />
							</FocusTrap>
						)}
					</div>
				);
			}

			const { getByTestId, rerender } = render(<Test />);

			const trigger = getByTestId("trigger");
			act(() => {
				trigger.focus();
			});

			rerender(<Test show />);

			const input1 = getByTestId("input1");
			expect(document.activeElement).toBe(input1);

			fireEvent.keyDown(input1, { key: "Tab", shiftKey: true });
			expect(document.activeElement).toBe(getByTestId("before"));
		});

		it("should skip over elements within the scope when moving focus to the next element", () => {
			function Test({ show }: { show?: boolean }) {
				return (
					<div>
						<input data-testid="before" />
						<button data-testid="trigger" />
						{show && (
							<FocusTrap restoreFocus autoFocus>
								<input data-testid="input1" />
								<input data-testid="input2" />
								<input data-testid="input3" />
							</FocusTrap>
						)}
						<input data-testid="after" />
					</div>
				);
			}

			const { getByTestId, rerender } = render(<Test />);

			const trigger = getByTestId("trigger");
			act(() => {
				trigger.focus();
			});

			rerender(<Test show />);

			const input1 = getByTestId("input1");
			expect(document.activeElement).toBe(input1);

			const input3 = getByTestId("input3");
			act(() => {
				input3.focus();
			});

			fireEvent.keyDown(input3, { key: "Tab" });
			expect(document.activeElement).toBe(getByTestId("after"));
		});
	});

	describe("auto focus", () => {
		it("should auto focus the first tabbable element in the scope on mount", () => {
			const { getByTestId } = render(
				<FocusTrap autoFocus>
					<div />
					<input data-testid="input1" />
					<input data-testid="input2" />
					<input data-testid="input3" />
				</FocusTrap>,
			);

			const input1 = getByTestId("input1");
			expect(document.activeElement).toBe(input1);
		});

		it("should do nothing if something is already focused in the scope", () => {
			const { getByTestId } = render(
				<FocusTrap autoFocus>
					<div />
					<input data-testid="input1" />
					<input data-testid="input2" autoFocus />
					<input data-testid="input3" />
				</FocusTrap>,
			);

			const input2 = getByTestId("input2");
			expect(document.activeElement).toBe(input2);
		});
	});

	describe("focus manager", () => {
		interface ItemProps {
			"data-testid": string;
			tabIndex?: number;
		}

		it("should move focus forward", () => {
			function Item(props: ItemProps) {
				const focusManager = useFocusManager();
				const onClick = () => {
					focusManager?.focusNext();
				};
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events
				return <div {...props} tabIndex={-1} role="button" onClick={onClick} />;
			}

			function Test() {
				return (
					<FocusTrap>
						<Item data-testid="item1" />
						<Item data-testid="item2" />
						<Item data-testid="item3" />
					</FocusTrap>
				);
			}

			const { getByTestId } = render(<Test />);
			const item1 = getByTestId("item1");
			const item2 = getByTestId("item2");
			const item3 = getByTestId("item3");

			act(() => {
				item1.focus();
			});

			fireEvent.click(item1);
			expect(document.activeElement).toBe(item2);

			fireEvent.click(item2);
			expect(document.activeElement).toBe(item3);

			fireEvent.click(item3);
			expect(document.activeElement).toBe(item3);
		});

		it("should move focus forward and wrap around", () => {
			function Item(props: ItemProps) {
				const focusManager = useFocusManager();
				const onClick = () => {
					focusManager?.focusNext({ wrap: true });
				};

				// eslint-disable-next-line jsx-a11y/click-events-have-key-events
				return <div {...props} tabIndex={-1} role="button" onClick={onClick} />;
			}

			function Test() {
				return (
					<FocusTrap>
						<Item data-testid="item1" />
						<Item data-testid="item2" />
						<Item data-testid="item3" />
					</FocusTrap>
				);
			}

			const { getByTestId } = render(<Test />);
			const item1 = getByTestId("item1");
			const item2 = getByTestId("item2");
			const item3 = getByTestId("item3");

			act(() => {
				item1.focus();
			});

			fireEvent.click(item1);
			expect(document.activeElement).toBe(item2);

			fireEvent.click(item2);
			expect(document.activeElement).toBe(item3);

			fireEvent.click(item3);
			expect(document.activeElement).toBe(item1);
		});

		it("should move focus forward but only to tabbable elements", () => {
			function Item(props: ItemProps) {
				const focusManager = useFocusManager();
				const onClick = () => {
					focusManager?.focusNext({ tabbable: true });
				};

				// eslint-disable-next-line jsx-a11y/click-events-have-key-events
				return <div tabIndex={0} {...props} role="button" onClick={onClick} />;
			}

			function Test() {
				return (
					<FocusTrap>
						<Item data-testid="item1" tabIndex={0} />
						<Item data-testid="item2" tabIndex={-1} />
						<Item data-testid="item3" tabIndex={0} />
					</FocusTrap>
				);
			}

			const { getByTestId } = render(<Test />);
			const item1 = getByTestId("item1");
			const item3 = getByTestId("item3");

			act(() => {
				item1.focus();
			});

			fireEvent.click(item1);
			expect(document.activeElement).toBe(item3);
		});

		it("should move focus backward", () => {
			function Item(props: ItemProps) {
				const focusManager = useFocusManager();
				const onClick = () => {
					focusManager?.focusPrevious();
				};

				// eslint-disable-next-line jsx-a11y/click-events-have-key-events
				return <div {...props} tabIndex={-1} role="button" onClick={onClick} />;
			}

			function Test() {
				return (
					<FocusTrap>
						<Item data-testid="item1" />
						<Item data-testid="item2" />
						<Item data-testid="item3" />
					</FocusTrap>
				);
			}

			const { getByTestId } = render(<Test />);
			const item1 = getByTestId("item1");
			const item2 = getByTestId("item2");
			const item3 = getByTestId("item3");

			act(() => {
				item3.focus();
			});

			fireEvent.click(item3);
			expect(document.activeElement).toBe(item2);

			fireEvent.click(item2);
			expect(document.activeElement).toBe(item1);

			fireEvent.click(item1);
			expect(document.activeElement).toBe(item1);
		});

		it("should move focus backward and wrap around", () => {
			function Item(props: ItemProps) {
				const focusManager = useFocusManager();
				const onClick = () => {
					focusManager?.focusPrevious({ wrap: true });
				};

				// eslint-disable-next-line jsx-a11y/click-events-have-key-events
				return <div {...props} tabIndex={-1} role="button" onClick={onClick} />;
			}

			function Test() {
				return (
					<FocusTrap>
						<Item data-testid="item1" />
						<Item data-testid="item2" />
						<Item data-testid="item3" />
					</FocusTrap>
				);
			}

			const { getByTestId } = render(<Test />);
			const item1 = getByTestId("item1");
			const item2 = getByTestId("item2");
			const item3 = getByTestId("item3");

			act(() => {
				item3.focus();
			});

			fireEvent.click(item3);
			expect(document.activeElement).toBe(item2);

			fireEvent.click(item2);
			expect(document.activeElement).toBe(item1);

			fireEvent.click(item1);
			expect(document.activeElement).toBe(item3);
		});

		it("should move focus backward but only to tabbable elements", () => {
			function Item(props: ItemProps) {
				const focusManager = useFocusManager();
				const onClick = () => {
					focusManager?.focusPrevious({ tabbable: true });
				};
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events
				return <div tabIndex={0} {...props} role="button" onClick={onClick} />;
			}

			function Test() {
				return (
					<FocusTrap>
						<Item data-testid="item1" tabIndex={0} />
						<Item data-testid="item2" tabIndex={-1} />
						<Item data-testid="item3" tabIndex={0} />
					</FocusTrap>
				);
			}

			const { getByTestId } = render(<Test />);
			const item1 = getByTestId("item1");
			const item3 = getByTestId("item3");

			act(() => {
				item3.focus();
			});

			fireEvent.click(item3);
			expect(document.activeElement).toBe(item1);
		});
	});
	describe("nested focus scopes", () => {
		it("should make child FocusTraps the active scope regardless of DOM structure", () => {
			const ChildComponent: React.FunctionComponent = (props) => {
				return ReactDOM.createPortal(props.children, document.body);
			};

			function Test({ show }: { show?: boolean }) {
				return (
					<div>
						<input data-testid="outside" />
						<FocusTrap restoreFocus contain>
							<input data-testid="input1" />
							{show && (
								<ChildComponent>
									<FocusTrap restoreFocus contain>
										<input data-testid="input3" />
									</FocusTrap>
								</ChildComponent>
							)}
						</FocusTrap>
					</div>
				);
			}

			const { getByTestId, rerender } = render(<Test />);
			// Set a focused node and make first FocusTrap the active scope
			const input1 = getByTestId("input1");
			act(() => {
				input1.focus();
			});
			fireEvent.focusIn(input1);
			expect(document.activeElement).toBe(input1);

			rerender(<Test show />);
			expect(document.activeElement).toBe(input1);
			const input3 = getByTestId("input3");
			act(() => {
				input3.focus();
			});
			fireEvent.focusIn(input3);
			expect(document.activeElement).toBe(input3);
		});
	});
});
