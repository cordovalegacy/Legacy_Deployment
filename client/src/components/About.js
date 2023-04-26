import React from 'react';
import { Link } from 'react-router-dom';
import Hana from '../img/hawaii2.jpg';
import AboutLogo from '../img/aboutlogo.jpg';

const About = () => {

    return (
        <div className='flex flex-col items-center gap-6 mt-40'>
            <h2>Why Legacy Builds?</h2>
            <div className='flex flex-col'>
                <div className='flex mr-20 ml-10 gap-6 opacity-80'>
                    <div className='border border-purple-500 p-5 rounded-3xl bg-slate-700 shadow-md shadow-purple-500 flex-2'>
                    <h3 className='underline'>Mission</h3>
                    <h4>
                        Our purpose is to collide science and art into something you can touch,
                        enjoy, and smile about! Legacy Builds LLC. is a custom computer business
                        with a focus on building a community of technology lovers, one desktop at a time
                    </h4>
                    </div>
                    <div className='flex gap-2 flex-col flex-1 border border-purple-500 p-5 rounded-3xl bg-slate-700 shadow-md shadow-purple-500'>
                        <h3 className='underline'>Contact Us</h3>
                        <h5>Owner, Builder, Tech Support: Brendan Cordova</h5>
                        <h5>Phone: (425)385-9807</h5>
                        <h5>Email: legacybuildspc@gmail.com</h5>
                    </div>
                </div>
                <div className='flex flex-col gap-6 ml-10 mr-20 mt-6 border border-purple-500 p-5 rounded-3xl bg-slate-700 shadow-md shadow-purple-500 opacity-80'>
                    <h3 className='underline'>What are our customers saying?</h3>
                    <h4>"Incredible service"</h4>
                    <h4>"One hell of a present for my kiddo's graduation"</h4>
                    <h4>"Wouldn't have been possible without the care and attention Brendan brings to his work and customers"</h4>
                    <h4>"Legacy Builds helped me elevate my business performance by building me something that could handle the workload!"</h4>
                </div>
            </div>
            <div className='flex mr-20 ml-10 gap-6 opacity-80 mb-10'>
                <div className='flex flex-col gap-10 flex-2 border border-purple-500 p-10 rounded-3xl bg-slate-700 shadow-md shadow-purple-500 text-white text-lg'>
                    <h3 className='underline'>Hours</h3>
                    <p>We operate as a remote business, so we are always available by text message or email</p>
                    <p>Unsure about what you want? Schedule a phone call!</p>
                    <img src={AboutLogo} alt="logo" className='rounded-xl w-5/6 mx-auto'/>
                </div>
                <div className='flex flex-col gap-10 flex-3 border border-purple-500 p-10 rounded-3xl bg-slate-700 shadow-md shadow-purple-500 text-white text-lg'>
                    <h3 className='underline'>Questions?</h3>
                    <h4>Check out our FAQ's!</h4>
                    <h5><Link to='/computers/faq'>Frequently Asked Questions</Link></h5>
                    <h3 className='my-6'>Thanks for stopping by!</h3>
                    <img src={Hana} alt="logo" className='rounded-xl w-3/5 mx-auto'/>
                </div>
            </div>
        </div>
    )
}

export default About;