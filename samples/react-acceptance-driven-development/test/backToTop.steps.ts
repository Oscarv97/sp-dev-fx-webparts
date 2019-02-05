import { configure, mount, ReactWrapper } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { defineFeature, loadFeature } from "jest-cucumber";
import * as React from "react";
import { FloatNavigationButton } from "../src/webparts/reactAtdd/components/FloatNavigationButton/FloatNaviagationButton";
import { IFloatState } from "../src/webparts/reactAtdd/components/FloatNavigationButton/IFloatState";
configure({ adapter: new Adapter() });


const featureFile = loadFeature("./test/features/backToTop.feature");

defineFeature(featureFile, (test) => {
    test('Happy Path Scroll to Top', ({ given, when, then, pending }) => {
        let backToTop: ReactWrapper<any, IFloatState> = null;
        let simulationScrollFunction = (component, window) => {
            window.scrollTo(0, window.document.scrollHeight);
            component.setState({hidden: false});
        };
        

        given('I load the page that has the backToTop Component', () => {
           backToTop = mount(React.createElement(FloatNavigationButton));
           backToTop.update();
        });

        when('I scroll down the page', () => {
            simulationScrollFunction(backToTop, window);
        });

        then('The backToTop button will appear', () => {
            setTimeout(() => {
                try{
                    expect(backToTop.state().hidden).toBe(false);
                }catch (error) {
                    console.error(JSON.stringify(error));
                }
            }, 400);
        });

        when('I click on the backToTop button', () => {
            let spy = spyOn(window, "scrollTo");
            let button = backToTop.find(`[data-automation="buttonOfScroll"]`);
            button.simulate('click');
        });

        then('the page will scroll to the top', () => {
            expect(window.scrollTo).toHaveBeenCalledWith({ behavior: "smooth", left: 0, top: 0});
        });
    });
});