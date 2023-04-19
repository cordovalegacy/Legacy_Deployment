import Insta from '../img/icons8-instagram.svg';
import Youtube from '../img/icons8-youtube-logo.svg';

const Footer = () => {

    //change all id's to classNames

    return(
        <footer>
                    <h3>Connect with Legacy Builds LLC</h3>
                    <div>
                    <a href="https://www.instagram.com/legacybuildspc/">
                        <img id='social-link' src={Insta} alt='Link to Instagram' />
                    </a>
                    <a href="https://www.youtube.com/channel/UCPm6ET8xaqRTYHL5tmRrpUQ/featured">
                        <img id='social-link' src={Youtube} alt='Link to Youtube' />
                    </a>
                    </div>
                    <a target="_blank" href="https://icons8.com/icon/111534/space-shuttle">Space Shuttle</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
                    <p>Website by Brendan Cordova, Owner of Legacy Builds LLC.</p>
                    <p>Instagram Link By: https://icons8.com/icons/set/instagram</p>
                    <p>Instagram Link By: https://icons8.com/icons/set/youtube</p>
                </footer>
    )
}

export default Footer