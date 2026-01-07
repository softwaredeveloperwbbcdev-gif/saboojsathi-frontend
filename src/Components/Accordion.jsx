import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Accordion = ({ items, keepOthersOpen }) => {
    const [accordianItems, setAccordianItems] = useState(null);
    useEffect(() => {
        if (items) {
            setAccordianItems([
                ...items.map((item) => ({
                    ...item,
                    toggled: false,
                })),
            ]);
        }
    }, [items]);
    function handleAccordianToggle(clickedItem) {
        setAccordianItems([
            ...accordianItems.map((item) => {
                let toggled = item.toggled;
                if (clickedItem.id === item.id) {
                    toggled = !item.toggled;
                } else if (!keepOthersOpen) {
                    toggled = false;
                }
                return {
                    ...item,
                    toggled,
                };
            }),
        ]);
    }
    return (
        <>
            <div className="text-[#374850] bg-[#f7f7f7]">
                {accordianItems?.map((item, index) => {
                    return (
                        <div
                            className="flex flex-col max-w-[500px]"
                            key={index}
                            id={item.id}
                        >
                            {item.to && item.download && (
                                <a
                                    href={
                                        item.params
                                            ? route(item.to, item.params)
                                            : route(item.to)
                                    }
                                    className="flex  text-sm p-2.5 px-3.75 text-black  hover:text-[#3c8dbc] 
                                    hover:bg-[#ecf0f5] hover:border-l-[#3c8dbc] hover:border-l-4"
                                >
                                    {item.label}
                                </a>
                            )}
                            {item.to && !item.download && (
                                <Link
                                    href={
                                        item.params
                                            ? route(item.to, item.params)
                                            : route(item.to)
                                    }
                                    className="flex  text-sm p-2.5 px-3.75 text-black  hover:text-[#3c8dbc] 
                                    hover:bg-[#ecf0f5] hover:border-l-[#3c8dbc] hover:border-l-4"
                                >
                                    {item.label}
                                </Link>
                            )}
                            {item.submenu && (
                                <>
                                    <button
                                        className="flex justify-between items-center text-sm p-2.5 px-3.75 text-black bg-transparent cursor-pointer transition-colors duration-150 ease-in-out  hover:text-[#3c8dbc] hover:bg-[#ecf0f5] hover:border-l-[#3c8dbc] hover:border-l-4"
                                        onClick={() =>
                                            handleAccordianToggle(item)
                                        }
                                    >
                                        <p>{item.label}</p>
                                        <div className="flex items-center justify-center w-[15px] font-semibol">
                                            {item.toggled ? "-" : "+"}
                                        </div>
                                    </button>
                                    <div
                                        className={` text-black ${
                                            item.toggled
                                                ? "max-h-[500px] transition-all duration-250 ease-in"
                                                : "max-h-0 overflow-hidden transition-all duration-150 ease-out"
                                        }`}
                                    >
                                        <div>
                                            <Accordion
                                                items={item.submenu}
                                                keepOthersOpen={false}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Accordion;
