import React from 'react';
import { Link } from 'react-router-dom';

const Faq = () => {

    return (
        <div className='pl-10 pr-20 mt-40'>
            <h2>Frequently Asked Question's</h2>
            <div className='flex flex-col mt-6 gap-6 justify-center'>
                <div className='flex flex-col gap-6 flex-3 border opacity-80 border-purple-500 p-10 rounded-3xl bg-slate-700 shadow-md shadow-purple-500 text-white text-lg'>
                    <h3 className='underline'>Computers</h3>
                    <div>
                        <p>What kind of computers does Legacy Builds offer?</p>
                        <p className='text-amber-300 font-bold'>We specialize in gaming, workstations, streaming setups, and content creation rigs.</p>
                    </div>
                    <div>
                        <p>What kind of computer do I need?</p>
                        <p className='text-amber-300 font-bold'>It depends! Try sending in a custom order on the <Link to='/computers/customs'>Custom</Link> page and we can work on it together!</p>
                    </div>
                    <div>
                        <p>Do you ship computers? Will they be safe?</p>
                        <p className='text-amber-300 font-bold'>We do! We ship through UPS, and insure it with shipping insurance so it makes it's way to you safe and sound.</p>
                    </div>
                    <div>
                        <p>How many computers have you built? Will mine be in good hands?</p>
                        <p className='text-amber-300 font-bold'>Absolutely. We have built over fifty, repaired over seventy-five, and have done <span className='red'>hundreds</span> of hours of mobile technical support and consulting.</p>
                    </div>
                    <div>
                        <p>Do you work on laptops?</p>
                        <p className='text-amber-300 font-bold'>We do not work on laptops at this time. But we can build you any desktop your heart desires!</p>
                    </div>
                </div>
                <div className='flex flex-col gap-6 flex-3 border opacity-80 border-purple-500 p-10 rounded-3xl bg-slate-700 shadow-md shadow-purple-500 text-white text-lg'>
                    <h3 className='underline'>Services</h3>
                    <div>
                        <p>Do you do custom room setups?</p>
                        <p className='text-amber-300 font-bold'>Upon the order of a computer, we also do custom room setups for an additional charge on an estimate basis.</p>
                    </div>
                    <div>
                        <p>Do you offer extra special package protection when shipping?</p>
                        <p className='text-amber-300 font-bold'>Yes, we use special expandable foam that sits inside the tempered glass of your case that keeps the parts steady and cushioned.</p>
                    </div>
                    <div>
                        <p>Do you offer technical support?</p>
                        <p className='text-amber-300 font-bold'>Yes! We offer 3 months of mobile (text) support to help you get started in understanding your PC and all it's quirks.</p>
                    </div>
                    <div>
                        <p>Do you offer custom water cooling loops?</p>
                        <p className='text-amber-300 font-bold'>Yes, we offer custom loop work. This work is typically more time intensive so the charge for this service is <span className='red'>25%</span> of the total cost of the parts for the build.</p>
                    </div>
                </div>
                <div className='flex flex-col mb-16 gap-6 flex-3 border opacity-80 border-purple-500 p-10 rounded-3xl bg-slate-700 shadow-md shadow-purple-500 text-white text-lg'>
                    <h3 className='underline'>Cost</h3>
                    <div>
                        <p>How much is your typical computer?</p>
                        <p className='text-amber-300 font-bold'>This amount depends on what your personal PC needs are. But it can range from <span className='red'>$750</span> to <span className='red'>$10k+</span>.</p>
                    </div>
                    <div>
                        <p>How much is shipping?</p>
                        <p className='text-amber-300 font-bold'>Shipping is about <span className='red'>$100</span> depending on the weight, insurance and type (ground vs. air).</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq;