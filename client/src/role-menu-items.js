const administrationModule = {
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
}

const clientManagementModule = {
  id: 'clientManagement',
  title: 'Client Management',
  type: 'collapse',
  icon: 'feather icon-menu',
  children: [
      {
          id: 'foodcourt',
          title: 'Locaciones',
          type: 'item',
          url: '/foodcourt',
      },
      {
          id: 'cliente',
          title: 'Clientes',
          type: 'item',
          url: '/clientlist',
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
      {
          id: 'portaluser',
          title: 'User Portal',
          type: 'item',
          url: '/userportalstafflist',
      }
  ]
}


export function pushElementsbyRole(profileArray) {

  const chartData = {
    items: [
        {
            id: 'bigTitle',
            title: 'Fidelio Consola',
            type: 'group',
            icon: 'icon-support',
            children: [       
            ]
        }
    ]
  };


    for (let i = 0; i < profileArray.length; i++) {
      switch (profileArray[i]) {
        case 'Admin':
          chartData.items[0].children.push(clientManagementModule);
          chartData.items[0].children.push(administrationModule);
          return chartData
        case 'Analista':
          chartData.items[0].children.push(clientManagementModule);
          return chartData
        case 'User':
          chartData.items[0].children.push(clientManagementModule);
          return chartData
        default:
          break;
      }
    }
  
} 


export default pushElementsbyRole;