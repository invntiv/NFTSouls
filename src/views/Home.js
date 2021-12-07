import React, { useEffect, useState } from "react";

const Home = () => {

    return (
        <div class="grid grid-cols-1 gap-6 lg:p-10 xl:grid-cols-3 lg:bg-base-200 rounded-box">
            <div className="navbar col-span-1 shadow-lg xl:col-span-3 bg-neutral-focus text-neutral-content rounded-box">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">           
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>               
                        </svg>
                    </button>
                </div>
                <div className="flex-none px-2 mx-2">
                    <span className="text-lg font-bold">NFTSouls</span>
                </div>
                <div className="flex justify-center flex-1 px-2 mx-2">
                    <div className="items-stretch hidden lg:flex">
                        <a className="btn btn-ghost btn-sm rounded-btn">HOME</a>
                        <a className="btn btn-ghost btn-sm rounded-btn">LITEPAPER</a>
                        <a className="btn btn-ghost btn-sm rounded-btn">ABOUT</a>
                        <a className="btn btn-ghost btn-sm rounded-btn">CONTACT</a>
                    </div>
                </div>
                <div className="flex-none">
                    <button className="btn btn-primary">
                        Login to Metamask
                    </button>
                </div>
            </div>

            <div className="card shadow-lg compact side bg-base-100">
                <div className="flex-row items-center space-x-4 card-body">
                    <h2 className="flex card-title">
                        <button className="btn btn-ghost btn-sm btn-circle loading"></button>
                        Downloading...
                    </h2>
                </div>
            </div>

            <div className="card shadow-lg compact side bg-base-100"></div>

            <div className="card row-span-3 shadow-lg compact bg-base-100"></div>

            <div className="card shadow-lg compact side bg-base-100"></div>
            <div className="card shadow-lg compact side bg-base-100"></div>
            <div className="card col-span-1 row-span-3 shadow lg xl:col-span-2 bg-base-100"></div>
            <div className="card shadow-lg compact side bg-base-100"></div>
            <div className="card shadow-lg compact side bg-base-100"></div>

        </div>
    );

}

export default Home;
