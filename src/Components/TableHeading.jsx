import React, { Children } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

function TableHeading({name, sortable = true, sort_field = null , sort_direction = null, sort_change = () => {},children}) {
    return (
        <th onClick={(e) => sort_change(name)}>
            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
            {children}
                {sortable && (<div>
                    <ChevronUpIcon
                        className={
                            "!w-4 " +
                            (sort_field === name &&
                            sort_direction === "asc"
                                ? "text-white"
                                : "")
                        }
                    />
                    <ChevronDownIcon
                        className={
                            "!w-4 -mt-2 " +
                            (sort_field === name &&
                            sort_direction === "desc"
                                ? "text-white"
                                : "")
                        }
                    />
                </div>)}
            </div>
        </th>
    );
}

export default TableHeading;
