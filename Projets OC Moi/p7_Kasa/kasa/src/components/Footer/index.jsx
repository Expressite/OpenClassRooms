import logo from "../../images/logo.png";

function Footer(){    
    return (
        <div className="footer">
            <div>
                <img src={logo} alt="Kasa" className="footerLogo"/>
            </div>
            <div>
                © 2020 Kasa. All rights reserved
            </div>
        </div>        
    );
}

export default Footer;