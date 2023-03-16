const chartData = {
    items: [
        {
            id: 'bigTitle',
            title: 'Fidelio Consola',
            type: 'group',
            icon: 'icon-support',
            children: [
                {
                    id: 'administration',
                    title: 'Administration',
                    type: 'collapse',
                    icon: 'feather icon-menu',
                    children: [
                        {
                            id: 'fideliostaff',
                            title: 'Staff Fidelio',
                            type: 'item',
                            url: '/fideliostaff',
                        },
                        {
                            id: 'profiles',
                            title: 'Profiles',
                            type: 'item',
                            url: '/profilelist',
                        },
                        {
                            id: 'userconsola',
                            title: 'User Consola',
                            type: 'item',
                            url: '/userconsolalist',
                        },
                    ]
                }, 
                {
                    id: 'clientManagement',
                    title: 'Client Management',
                    type: 'collapse',
                    icon: 'feather icon-menu',
                    children: [
                        {
                            id: 'foodcourt',
                            title: 'FoodCourts',
                            type: 'item',
                            url: '/foodcourt',
                        },
                        {
                            id: 'organization',
                            title: 'Organización',
                            type: 'item',
                            url: '/organizationlist',
                        },
                        {
                            id: 'local',
                            title: 'Local',
                            type: 'item',
                            url: '/local',
                        },
                        {
                            id: 'portalstaff',
                            title: 'Staff Portal',
                            type: 'item',
                            url: '/portalstafflist',
                        },
                    ]
                }, 
                
            ]
        }
    ]
};
export default chartData;