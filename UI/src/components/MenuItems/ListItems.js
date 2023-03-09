import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuildingColumns, faBookOpen, faList, faEllipsisH} from "@fortawesome/free-solid-svg-icons";

export const listItems = [
    {
      title: <><FontAwesomeIcon icon={faBuildingColumns}/> Home</>,
      url: '/',
      style: {
        textDecorationLine:'none',
        color:'white',  
      },
    },
    {
      title: <><FontAwesomeIcon icon={faList}/> Catalog</>,
      url: '/Catalog',
      style: {
        textDecorationLine:'none',
        color:'white',  
      },
    },
    {
      title: <><FontAwesomeIcon icon={faBookOpen}/> Booking</>,
      url: '/Booking',
      style: {
        textDecorationLine:'none',
        color:'white',  
      },
    },
    {
      title: <> Service</>,
      url: '/service',
      style: {
        border:'none',
        textDecorationLine:'none',
        color:'white',
        backgroundColor: '#008a5e',  
      },
      submenu: [
        {
          title: 'Workspace',
          url: 'workspace',
          backstyle: {
            backgroundColor: 'white'  
          },
          submenu: [
            {
              title: 'Create Workspace',
              url: '/CreateWorkspace',
            }
          ],
        },
        {
          title: 'Category',
          url: 'category',
          backstyle: {
            backgroundColor: 'white'  
          },
          submenu: [
            {
              title: 'Create Category',
              url: '/CreateCategory',
            },
            {
              title: 'Update Category',
              url: '/UpdateCategory',
            },
            {
              title: 'Delete Category',
              url: '/DeleteCategory',
            }
          ],
        },
        // {
        //   title: 'Booking',
        //   url: 'booking',
        //   backstyle: {
        //     backgroundColor: 'white'  
        //   },
        //   submenu: [
        //     {
        //       title: 'Create Booking',
        //       url: '/CreateBooking',
        //     },
        //     {
        //       title: 'Update Booking',
        //       url: '/UpdateBooking',
        //     },
        //     {
        //       title: 'Delete Booking',
        //       url: '/DeleteBooking',
        //     },
        //   ],
        // },
      ],
    },
    {
      title: <><FontAwesomeIcon icon={faEllipsisH}/> About</>,
      url: '/about',
      style: {
        textDecorationLine:'none',
        color:'white',  
      },
    },
  ];