import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () =>
{
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-links-group">
                    <div className="footer-section">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Safety</a></li>
                            <li><a href="#">Guidelines</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-social">
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaLinkedinIn /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaTwitter /></a>
                </div>
            </div>

            <hr />

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} TravelPro. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
