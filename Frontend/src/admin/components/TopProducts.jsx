export default function TopProducts(){
    const members = [
        {
            name: "Lindsay Walton",
            email: "lindsay.walton@example.com",
            title: "Front-end Developer",
            department: "Optimization",
            status: "Active",
            role: "Member",
            image: "https://placehold.co/40x40?text=LW"
        },
        {
            name: "Courtney Henry",
            email: "courtney.henry@example.com",
            title: "Designer",
            department: "Intranet",
            status: "Active",
            role: "Admin",
            image: "https://placehold.co/40x40?text=CH"
        },
        {
            name: "Tom Cook",
            email: "tom.cook@example.com",
            title: "Director of Product",
            department: "Directives",
            status: "Active",
            role: "Member",
            image: "https://placehold.co/40x40?text=TC"
        },
        {
            name: "Whitney Francis",
            email: "whitney.francis@example.com",
            title: "Copywriter",
            department: "Program",
            status: "Active",
            role: "Admin",
            image: "https://placehold.co/40x40?text=WF"
        },
        {
            name: "Leonard Krasner",
            email: "leonard.krasner@example.com",
            title: "Senior Designer",
            department: "Mobility",
            status: "Active",
            role: "Owner",
            image: "https://placehold.co/40x40?text=LK"
        },
        {
            name: "Floyd Miles",
            email: "floyd.miles@example.com",
            title: "Principal Designer",
            department: "Security",
            status: "Active",
            role: "Member",
            image: "https://placehold.co/40x40?text=FM"
        }
    ];

    return (
        <div className="container mx-auto p-4">
                    <div className="overflow-x-auto">
                        <div>
                            <h2 className="font-bold my-4">Top Products</h2>
                        </div>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-left">Name</th>
                                    <th className="py-2 px-4 border-b text-left">Title</th>
                                    <th className="py-2 px-4 border-b text-left">Status</th>
                                    <th className="py-2 px-4 border-b text-left">Role</th>
                                    <th className="py-2 px-4 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b flex items-center">
                                            <img src={member.image} alt={`${member.name}'s profile`} className="w-10 h-10 rounded-full mr-4" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                <div className="text-sm text-gray-500">{member.email}</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <div className="text-sm text-gray-900">{member.title}</div>
                                            <div className="text-sm text-gray-500">{member.department}</div>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b text-sm text-gray-900">{member.role}</td>
                                        <td className="py-2 px-4 border-b text-sm text-blue-500 cursor-pointer">Edit</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
    )
}