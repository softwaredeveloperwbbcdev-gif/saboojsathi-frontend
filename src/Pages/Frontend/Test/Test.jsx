import React from "react";
import Accordion from "@/Components/Accordion";

function Test() {
    const data = [
        {
            id: 0,
            label: "Phase I",
            to: "School.dashboard",
        },
        {
            id: 1,
            label: "Phase II",
            submenu: [
                {
                    id: 11,
                    label: "Submenu 1",
                    submenu: [
                        {
                            id: 111,
                            label: "Submenu 1.1",
                            to: "School.dashboard",
                        },
                        {
                            id: 112,
                            label: "Submenu 1.2",
                            to: "School.dashboard",
                        },
                        {
                            id: 113,
                            label: "Submenu 1.3",
                            to: "School.dashboard",
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            label: "Lable 3",
            submenu: [
                {
                    id: 21,
                    label: "Submenu 2.1",
                    to: "School.dashboard",
                },
                {
                    id: 22,
                    label: "Submenu 2.2",
                    to: "School.dashboard",
                },
            ],
        },
    ];
    return (
        <div>
            <Accordion items={data} keepOthersOpen={false} />
        </div>
    );
}

export default Test;
