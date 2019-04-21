import React, {Component} from "react";
import Modal from "react-modal";
import styles from "./css/agency.css";
import cx from "classnames";
import {withRouter} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck} from "@fortawesome/free-solid-svg-icons";



const viewStyles = {
    content : {
        top                   : "50%",
        left                  : "50%",
        right                 : "auto",
        bottom                : "auto",
        marginRight           : "-50%",
        transform             : "translate(-50%, -50%)",
        boxShadow             : "1px 1px 15px 1px #aaaaaa",
        width                 : "100%",
        margin                : "4em auto",
        transition            : "all .5s ease",
        height                : "500px"
        
    },
    overlay : {
    }
};
Modal.setAppElement("#root");
class SelectViewItem extends Component { 
    state = {
        modalIsOpen: false,
        load: false
    }
    openModal = (e) => {
        //signupStyles.content.opacity = "1";
        const { history, name} = this.props;
        history.push(`/select/${name}/`);
        e.stopPropagation();
        
        this.setState({modalIsOpen: true});
        
        /*
        $(document).ready(function(){
            $(".capture").find("*").each((index,item) => {
                let temp = item.className;
                $(item).removeClass(temp).addClass("capture").addClass(temp);
                temp = null;
                //item.className = "capture " + item.className; 
            
            });
        });
        */
        /*
        $(document).ready(function(){
            $(".capture").find("*").prop("class", "capture");
        });
        */
    }
    
    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = "#f00";
    }
    
    closeModal = () => {
        const { history } = this.props;
        
        this.setState({modalIsOpen: false});
        history.push("/select");
    }
    mouseEnter = () => {
        this.setState({mouseOver: true});
    }
    itemCheck = () => {
        const {onCheck} = this.props;
        onCheck();
        this.setState({checked : !this.state.checked});
    }
    componentDidMount() {
        
        /*
        $("#capture").addClass("testt");
        $("#capture").find("*").addClass("capture");
        
        let iframe=document.createElement("iframe");
        document.body.appendChild(iframe);
        var iframedoc=iframe.contentDocument||iframe.contentWindow.document;
        iframedoc.body.innerHTML=html;
        html2canvas(iframedoc.body, {
            onrendered: function(canvas) {
                document.body.appendChild(canvas);
                document.body.removeChild(iframe);
                const imgData = canvas.toDataURL("image/png");
                document.getElementById("test").src = imgData;
            }
        });
        */
    }
    render(){
        
        const {id,src, body, checked, onCheck, name} = this.props;
        const { modalIsOpen, load} = this.state;
        const {
            openModal,
            closeModal,
            afterOpenModal,
            mouseEnter,
            itemCheck,
        } = this;
        return (
            <div className={cx(styles.col_md_4, styles.col_sm_4, styles.portfolio_item)} >
                <a onClick={(e) => onCheck(e, id)} className={styles.portfolio_link}>
                    <div className={checked ? cx(styles.portfolio_hover, styles.checked) : styles.portfolio_hover}>
                        <div className={styles.portfolio_hover_content}>
                            <i className={checked ? "fa fa-check fa-3x "+ cx(styles.checked, styles.fadeInLeft, styles.animated) : "fa fa-check fa-3x " + cx(styles.no_check, styles.fadeOutRight, styles.animated)}></i>
                            <i onClick={openModal} className={styles.fa_plus}><FontAwesomeIcon icon={faPlus} size="3x"/></i>
                        </div>
                    </div>
                    <img id="test" ref={element => this.test=element} className="img-responsive" src={src} />
                    
                </a>
                
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={() => closeModal()}
                    style={viewStyles}
                    contentLabel="modal"
                    closeTimeoutMS={400}
                        
                    shouldCloseOnOverlayClick={true}
                >      
                    
                    <div id="capture" className={styles.capture + " capture"} ref={element => this.capture=element} dangerouslySetInnerHTML={{ __html: body}}></div>

                </Modal>
                
            </div>
            
        );
    }
}
/*
SelectViewItem.propTypes = {
    src: PropTypes.string,
    onCheck: PropTypes.func,
    onView: PropTypes.func
    //onSignup: PropTypes.func
};

SelectViewItem.defaultProps = {
    src: "",
    onView: () => console.warn("onView not defined"),
    onCheck: () => console.warn("onCheck not defined")
    //onSignup: () => console.warn("onSignup not defined")
};
*/
export default withRouter(SelectViewItem);