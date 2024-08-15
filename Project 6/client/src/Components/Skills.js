import React from 'react';

export default function Skills() {
    const skills = [
        { name: "Solidity", percentage: 80, color: "#FFB700" },
        { name: "Motoko Language", percentage: 60, color: "#FFB700" },
        { name: "Rust", percentage: 60, color: "#FFB700" },
        { name: "Python", percentage: 40, color: "#FFB700" },
        { name: "JavaScript [React Js, Node JS]", percentage: 70, color: "#FFB700" },
        { name: "HTML5, CSS3 [SCSS, Tailwind, Bootstrap etc]", percentage: 90, color: "#FFB700" },
        { name: "UIUX - Figma", percentage: 80, color: "#FFB700" },
        { name: "Linux [Kali, Ubuntu]", percentage: 75, color: "#FFB700" },
        { name: "Web Design [Wordpress]", percentage: 90, color: "#FFB700" },
        { name: "Database [MySQL, MongoDB]", percentage: 70, color: "#FFB700" },
        { name: "Digital Marketing", percentage: 80, color: "#FFB700" },
    ];

    return (
        <div className="h-screen flex justify-center items-center dark:bg-black rounded-[10px]">
            <div className="max-w-[1443px] mx-auto w-full">
                <h4 className="text-3xl md:text-5xl dark:text-white font-bold mb-6 text-center mb-20">Skills</h4>
                {skills.map((skill, index) => (
                    <div className="mb-7" key={index}>
                        <div className="flex justify-between py-1">
                            <span className="text-base text-gray-lite font-semibold text-white">{skill.name}</span>
                            <span className="text-base font-semibold text-gray-lite pr-5 text-white">{skill.percentage}%</span>
                        </div>
                        <svg className="rc-progress-line" viewBox="0 0 100 1" preserveAspectRatio="none">
                            <path
                                className="rc-progress-line-trail"
                                d="M 0.5,0.5 L 99.5,0.5"
                                strokeLinecap="round"
                                stroke="#FFFFFF"
                                strokeWidth="1"
                                fillOpacity="0"
                            />
                            <path
                                className="rc-progress-line-path"
                                d="M 0.5,0.5 L 99.5,0.5"
                                strokeLinecap="round"
                                stroke={skill.color}
                                strokeWidth="1"
                                fillOpacity="0"
                                style={{
                                    strokeDasharray: `${skill.percentage}px, 100px`,
                                    strokeDashoffset: '0px',
                                    transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s linear 0s, 0.06s'
                                }}
                            />
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    );
};
