import { themeChange } from 'theme-change'
import React, { useEffect, useState } from "react";
import twitterLogo from '../assets/twitter-logo.svg';
import myEpicNft from '../utils/MyEpicNFT.json';
import { ethers } from "ethers";
const TWITTER_HANDLE = '_indras_net_';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

//const OPENSEA_LINK = '';
//const TOTAL_MINT_COUNT = 50;

const Home = () => {

    return (
        <div class="grid grid-cols-1 gap-6 lg:p-10 xl:grid-cols-3 lg:bg-base-200 rounded-box">
            <div class="navbar col-span-1 shadow-lg xl:col-span-3 bg-neutral-focus text-neutral-content rounded-box">
                <div class="flex-none">
                    <button class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">           
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>               
                        </svg>
                    </button>
                </div>
                <div class="flex-none px-2 mx-2">
                    <span class="text-lg font-bold">NFTSouls</span>
                </div>
                <div class="flex justify-center flex-1 px-2 mx-2">
                    <div class="items-stretch hidden lg:flex">
                        <a class="btn btn-ghost btn-sm rounded-btn">HOME</a>
                        <a class="btn btn-ghost btn-sm rounded-btn">PAGE 1</a>
                        <a class="btn btn-ghost btn-sm rounded-btn">PAGE 2</a>
                        <a class="btn btn-ghost btn-sm rounded-btn">PAGE 3</a>
                    </div>
                </div>
                <div class="flex-none">
                    <button class="btn btn-primary">
                        Login to Metamask
                    </button>
                </div>
            </div>
            <div class="card col-span-1 row-span-3 shadow-lg xl:col-span-2 bg-base-100"></div>
            <div class="grid grid-flow-col gap-5 text-center auto-cols-max"></div>
        </div>
    );

}

export default Home;
