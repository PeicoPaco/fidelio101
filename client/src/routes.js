import * as React from 'react';
const CreateFoodCourt = React.lazy(() => import('./Demo/Administration/FoodCourt/Actions/CreateFoodCourt'))
const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const FoodCourtList = React.lazy(() => import('./Demo/Administration/FoodCourt/FoodCourt'));
const EditFoodCourt =React.lazy(() => import('./Demo/Administration/FoodCourt/Actions/EditFoodCourt'));
const DetailsFoodCourt =React.lazy(() => import('./Demo/Administration/FoodCourt/Actions/DetailsFoodCourt'))
const FidelioStaff =React.lazy(() => import('./Demo/Administration/FidelioStaff/FidelioStaffList'))
const CreateFidelioStaff =React.lazy(() => import('./Demo/Administration/FidelioStaff/Actions/CreateFidelioStaff'))
const EditFidelioStaff =React.lazy(() => import('./Demo/Administration/FidelioStaff/Actions/EditFidelioStaff'))
const DetailsFidelioStaff =React.lazy(() => import('./Demo/Administration/FidelioStaff/Actions/DetailsFidelioStaff'))
const ProfileList =React.lazy(() => import('./Demo/Administration/Profiles/ProfileList'))
const ClientList =React.lazy(() => import('./Demo/Administration/Client/ClientList'))
const CreateClient =React.lazy(() => import('./Demo/Administration/Client/Actions/CreateClient'))
const EditClient =React.lazy(() => import('./Demo/Administration/Client/Actions/EditClient'))
const DetailsClient =React.lazy(() => import('./Demo/Administration/Client/Actions/DetailsClient'))
const Local =React.lazy(() => import('./Demo/Administration/Local/LocalList'))
const CreateLocal =React.lazy(() => import('./Demo/Administration/Local/Actions/CreateLocal'))
const EditLocal =React.lazy(() => import('./Demo/Administration/Local/Actions/EditLocal'))
const DetailsLocal =React.lazy(() => import('./Demo/Administration/Local/Actions/DetailsLocal'))
const UserConsolaList = React.lazy(() => import('./Demo/Administration/UserConsola/UserConsolaList'));
const CreateUserConsola = React.lazy(() => import('./Demo/Administration/UserConsola/Actions/CreateUserConsola'));
const EditUserConsola = React.lazy(() => import('./Demo/Administration/UserConsola/Actions/EditUserConsola'));
const DeleteUserConsola = React.lazy(() => import('./Demo/Administration/UserConsola/Actions/DeleteUserConsola'));
const DetailsUserConsola = React.lazy(() => import('./Demo/Administration/UserConsola/Actions/DetailsUserConsola'));
const PortalStaffList = React.lazy(() => import('./Demo/Administration/PortalStaff/PortalStaffList'));
const CreatePortalStaff = React.lazy(() => import('./Demo/Administration/PortalStaff/Actions/CreatePortalStaff'));
const EditPortalStaff = React.lazy(() => import('./Demo/Administration/PortalStaff/Actions/EditPortalStaff'));
const DetailsPortalStaff = React.lazy(() => import('./Demo/Administration/PortalStaff/Actions/DetailsPortalStaff'));
const TestRedux = React.lazy(() => import('./Demo/Test/Test'));
const CreateFidelioUser = React.lazy(() => import('./Demo/Administration/FidelioStaff/Actions/CreateFidelioUser'));
const UserPortalStaffList = React.lazy(() => import('./Demo/Administration/UserPortalStaff/UserPortalStaffList'));
const CreateUserPortalStaff = React.lazy(() => import('./Demo/Administration/UserPortalStaff/Actions/CreateUserPortalStaff'));
const EditUserPortalStaff = React.lazy(() => import('./Demo/Administration/UserPortalStaff/Actions/EditUserPortalStaff'));
const DeleteUserPortalStaff = React.lazy(() => import('./Demo/Administration/UserPortalStaff/Actions/DeleteUserPortalStaff'));

const routes = [ 
    { path: '/home', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/foodcourt', exact: true, name: 'FoodCourt', component: FoodCourtList},
    { path: '/createfoodcourt', exact: true, name: 'Create Food Court', component: CreateFoodCourt },
    { path: '/editFoodCourt/:id', exact: true, name: 'Edit Food Court', component: EditFoodCourt},
    { path: '/detailsFoodCourt/:id', exact: true, name: 'Details Food Court', component: DetailsFoodCourt},
    { path: '/fideliostaff', exact: true, name: 'Fidelio Staff', component: FidelioStaff},
    { path: '/createfideliostaff', exact: true, name: 'Create Fidelio Staff', component: CreateFidelioStaff},
    { path: '/editfideliostaff/:id', exact: true, name: 'Edit Fidelio Staff', component: EditFidelioStaff},
    { path: '/detailsfideliostaff/:id', exact: true, name: 'Details Fidelio Staff', component: DetailsFidelioStaff},
    { path: '/profilelist', exact: true, name: 'Profile List', component: ProfileList},
    { path: '/clientlist', exact: true, name: 'Client List', component: ClientList},
    { path: '/createclient', exact: true, name: 'Create Client', component: CreateClient},
    { path: '/editclient/:id', exact: true, name: 'Edit Client', component: EditClient},
    { path: '/detailsclient/:id', exact: true, name: 'Details Client', component: DetailsClient},
    { path: '/local', exact: true, name: 'Local List', component: Local},
    { path: '/createlocal', exact: true, name: 'Create Local', component: CreateLocal},
    { path: '/editlocal/:id', exact: true, name: 'Edit Local', component: EditLocal},
    { path: '/detailslocal/:id', exact: true, name: 'Details Local', component: DetailsLocal},
    { path: '/userconsolalist', exact: true, name: 'User Consola', component: UserConsolaList },
    { path: '/createuserconsola', exact: true, name: 'Create User Consola', component: CreateUserConsola },
    { path: '/createfideliouser/:id', exact: true, name: 'Create Fidelio User', component: CreateFidelioUser },
    { path: '/edituserconsola/:id/:email', exact: true, name: 'Edit User Consola', component: EditUserConsola },
    { path: '/deleteuserconsola/:id/:email', exact: true, name: 'Delete User Consola', component: DeleteUserConsola },
    { path: '/detailsuserconsola/:id/:email', exact: true, name: 'Details User Consola', component: DetailsUserConsola },
    { path: '/portalstafflist', exact: true, name: 'Portal Staff', component: PortalStaffList },
    { path: '/createportalstaff', exact: true, name: 'Create Portal Staff', component: CreatePortalStaff },
    { path: '/editportalstaff/:id', exact: true, name: 'Edit Portal Staff', component: EditPortalStaff },
    { path: '/detailsportalstaff/:id', exact: true, name: 'Details Portal Staff', component: DetailsPortalStaff },
    { path: '/userportalstafflist', exact: true, name: 'User Portal Staff', component: UserPortalStaffList },
    { path: '/createuserportalstaff', exact: true, name: 'Create User Portal Staff', component: CreateUserPortalStaff },
    { path: '/edituserportalstaff/:id', exact: true, name: 'Edit User Portal Staff', component: EditUserPortalStaff },
    { path: '/deleteuserportalstaff/:id/:email', exact: true, name: 'Delete User Portal Staff', component: DeleteUserPortalStaff },

];
export default routes;
