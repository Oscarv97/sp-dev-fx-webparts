import * as React from "react";
import { IFloatState } from "./IFloatState";

export class FloatNavigationButton extends React.Component<{}, IFloatState> {

    /**
     *  we know from our Acceptance Criteria the initial state is hidden
     */
    constructor(props: any) {
        super(props);

        this.state = {
            hidden: true,
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.handleClick = this.handleClick.bind(this);

        window.addEventListener("scroll", this.handleScroll);
    }

    private handleScroll(): void {
        let currentWindowPosition = window.pageYOffset;
        if (currentWindowPosition >= 300) {
            this.setState({ hidden: false });
        } else {
            if (!this.state.hidden) {
                this.setState({ hidden: true });
            }
        }
    }

    private handleClick(): void {
        window.scrollTo({
            behavior: "smooth",
            left: 0,
            top: 0,
        });
    }

    public render(): React.ReactElement<any> {
        return (
            <div className="floatNav-Container ms-scaleDownIn100" hidden={this.state.hidden} data-automation="backToTopButton">
                <button
                    className="floatNavButton"
                    title={"Return to Top pf Page"}
                    onClick={this.handleClick}
                    data-automation="buttonOfScroll"
                >
                    <i className="ms-Icon ms-Icon--ChevronUpMed"></i>
                </button>
                );
            </div>
        );
    }
}