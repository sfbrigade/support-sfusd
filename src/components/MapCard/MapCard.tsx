import Link from "next/link";
import Image from "next/image";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";


const MapCard = (props: { img: string; name: string; district: string ; students: string; frl: string; ell: string ; }) => {
    return (
        <>
        <div className="fixed mx-auto bottom-4 left-20 max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl z-40">
            <div className="grid grid-cols-4 gap-3 md:flex">
                <div className="sm:shrink-0">
                    <img className="h-48 object-cover h-full md:w-48" src={props.img} alt={props.name} />
                </div>
                <div className="col-span-3">
                    <div className="tracking-wide text-lg text-indigo-500 hover:underline font-semibold font-sans">{props.name}</div>
                    <div className="block mt-1 text-lg leading-tight font-medium text-black font-serif">{props.district} District</div>
                    <div className="mt-2 text-slate-800 font-serif font-bold">
                        <div className="flex items-center"><img src="student.png" alt="student image" className="h-6" />{props.students} Students</div>
                        <div className="flex items-center"><img src="frl.png" alt="meal image" className="h-6" />{props.frl}% Free and Reduced Lunch</div>
                        <div className="flex items-center"><img src="language.png" alt="language image" className="h-6" />{props.ell}% English Language Learners</div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default MapCard;