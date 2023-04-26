import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Harley from '../img/harley.jpg';
import Enthusiast from '../img/enthusiast.JPG';
import HighEnd from '../img/highend.JPG';
import MidTier from '../img/midtier.JPG';
import SuperTier from '../img/supertier.JPG';
import Aurora from '../img/aurora.jpg';
import Batman from '../img/batman.jpg';
import Thanos from '../img/thanos.jpg';
import George from '../img/george.jpg';
import Captain from '../img/captainamerica.jpg';
import Cyborg from '../img/cyborg.jpg';
import HulkBuster from '../img/hulkbuster.jpg';
import Mew from '../img/mew.jpg';
import Mike from '../img/mike.jpg';
import NarutoOrange from '../img/narutoorange.jpg';
import NarutoYellow from '../img/narutoyellow.jpg';
import SpiderMan from '../img/spiderman.jpg';
import SuperMan from '../img/superman.jpg';
import Vader from '../img/vader.jpg';
import VenomHulk from '../img/venomhulk.jpg';
import WarMachine from '../img/warmachine.jpg';
import WonderWoman from '../img/wonderwoman.jpg';
import ZombieHulk from '../img/zombiehulk.jpg';
import Bart from '../img/bart.jpg';
import Buu from '../img/buu.jpg';
import DadThanos from '../img/dadthanos.jpg';
import Deadpool from '../img/deadpool.jpg';
import Demonslayer from '../img/demonslayer.jpg';
import ESO from '../img/eso.jpg';
import Ghostrider from '../img/ghostrider.jpg';
import Inventory from '../img/inventory.jpg';
import Joker from '../img/joker.jpg';
import Jolteon from '../img/jolteon.jpg';
import Marines from '../img/marines.jpg';
import Revan from '../img/revan.jpg';
import Sailormoon from '../img/sailormoon.jpg';
import Witcher from '../img/witcher.jpg';

const Gallery = () => {

    return (
        <div className='flex flex-col p-4 mt-40 mb-10 gap-2'>
            <h2 className='text-left pl-10'>Explore some of our work...</h2>
            <h3 className='text-right pr-10'>Carefully crafted, meticulously assembled.</h3>
            <div className='gallery-wrapper'>
                <Carousel infiniteLoop useKeyboardArrows autoPlay emulateTouch={true} swipeable={true}>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={Bart} alt='bart' />
                    </div>
                    <div>
                        <p className='carousel-p'>High-End</p>
                        <img src={Buu} alt='buu' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={DadThanos} alt='dadthanos' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={Deadpool} alt='deadpool' />
                    </div>
                    <div>
                        <p className='carousel-p'>Super-Tier</p>
                        <img src={Demonslayer} alt='demon' />
                    </div>
                    <div>
                        <p className='carousel-p'>High-End</p>
                        <img src={ESO} alt='eso' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={Ghostrider} alt='ghostrider' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={Inventory} alt='inventory' />
                    </div>
                    <div>
                        <p className='carousel-p'>Starter</p>
                        <img src={Joker} alt='joker' />
                    </div>
                    <div>
                        <p className='carousel-p'>Starter</p>
                        <img src={Jolteon} alt='jolteon' />
                    </div>
                    <div>
                        <p className='carousel-p'>High-End</p>
                        <img src={Marines} alt='marines' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={Revan} alt='revan' />
                    </div>
                    <div>
                        <p className='carousel-p'>High-End</p>
                        <img src={Sailormoon} alt='sailor' />
                    </div>
                    <div>
                        <p className='carousel-p'>High-End</p>
                        <img src={Witcher} alt='witcher' />
                    </div>
                    <div>
                        <p className='carousel-p'>Starter</p>
                        <img src={Harley} alt='Harley' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={Aurora} alt='Harley' />
                    </div>
                    <div>
                        <p className='carousel-p'>Enthusiast</p>
                        <img src={Enthusiast} alt='Punisher' />
                    </div>
                    <div>
                        <p className='carousel-p'>High-End</p>
                        <img src={HighEnd} alt='Anime' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={MidTier} alt='Custom' />
                    </div>
                    <div>
                        <p className='carousel-p'>Super-Tier</p>
                        <img src={SuperTier} alt='Godzilla' />
                    </div>
                    <div>
                        <p className='carousel-p'>Super-Tier</p>
                        <img src={Batman} alt='Batman' />
                    </div>
                    <div>
                        <p className='carousel-p'>Super-Tier</p>
                        <img src={George} alt='George' />
                    </div>
                    <div>
                        <p className='carousel-p'>Super-Tier</p>
                        <img src={Thanos} alt='Thanos' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={Captain} alt='Captain' />
                    </div>
                    <div>
                        <p className='carousel-p'>High-End</p>
                        <img src={Cyborg} alt='Cyborg' />
                    </div>
                    <div>
                        <p className='carousel-p'>Enthusiast</p>
                        <img src={HulkBuster} alt='HulkBuster' />
                    </div>
                    <div>
                        <p className='carousel-p'>High-End</p>
                        <img src={Mew} alt='Mew' />
                    </div>
                    <div>
                        <p className='carousel-p'>High-End</p>
                        <img src={Mike} alt='Mike' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={NarutoOrange} alt='Naruto' />
                    </div>
                    <div>
                        <p className='carousel-p'>Starter</p>
                        <img src={NarutoYellow} alt='Naruto' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={SpiderMan} alt='Spidey' />
                    </div>
                    <div>
                        <p className='carousel-p'>Starter</p>
                        <img src={SuperMan} alt='SuperMan' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={Vader} alt='Vader' />
                    </div>
                    <div>
                        <p className='carousel-p'>Super-Tier</p>
                        <img src={VenomHulk} alt='VenomHulk' />
                    </div>
                    <div>
                        <p className='carousel-p'>High-End</p>
                        <img src={WarMachine} alt='WarMachine' />
                    </div>
                    <div>
                        <p className='carousel-p'>Mid-Tier</p>
                        <img src={WonderWoman} alt='WonderWoman' />
                    </div>
                    <div>
                        <p className='carousel-p'>Starter</p>
                        <img src={ZombieHulk} alt='ZombieHulk' />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Gallery;