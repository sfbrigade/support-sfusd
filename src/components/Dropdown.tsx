import React, { useState } from 'react'
import { DropdownItem } from './SearchBar';

interface DropdownProps <ItemType> {
    items: DropdownItem <ItemType>[];
    onItemSelect: (item: DropdownItem<ItemType>) => void;
}

export default function Dropdown <ItemType=any> ({ items, onItemSelect } : DropdownProps<ItemType>): JSX.Element{
    return (
        <>
                <div className={`absolute top-8 z-30 w-[250px] min-h-[300px] flex flex-col py-4 bg-zinc-400 rounded-md`}>
                    <ul>
                    {
                        items.map(item =>
                            <li
                                key={item.value}
                                className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1"
                                onClick={()=>onItemSelect(item)}
                            >{item.label}</li>
                        )
                    }
                    </ul>
                </div>
        </>
    )
}