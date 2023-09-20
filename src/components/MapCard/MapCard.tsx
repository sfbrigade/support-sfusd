
import Image from 'next/image';
import React from 'react';

const MapCard = () => {

return (
    <>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="grid grid-cols-4 gap-3 md:flex">
                <div className="sm:shrink-0">
                    <img className="h-48 object-cover h-full md:w-48" src="/img/june_jordan_school.png" alt="Modern building architecture" />
                </div>
                <div className="col-span-3">
                    <div className="tracking-wide text-lg text-indigo-500 font-semibold font-sans">June Jordan School for Equity</div>
                    <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline font-serif">Excelsior District</div>
                    <div className="mt-2 text-slate-800 font-serif font-bold">
                        <div className="flex items-center"><img src="img/student.png" className="h-6" />325 Students</div>
                        <div className="flex items-center"><img src="img/frl.png" className="h-6" />65% Free and Reduced Lunch</div>
                        <div className="flex items-center"><img src="img/language.png" className="h-6" />48% English Language Learners</div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default MapCard;