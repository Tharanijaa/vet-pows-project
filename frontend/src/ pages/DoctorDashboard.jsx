// // // src/components/DoctorDashboard.jsx
// // import React, { useState } from 'react';
// // import DoctorAppointments from './DoctorAppointments'; // adjust path as needed

// // const DoctorDashboard = () => {
// //   const [activeTab, setActiveTab] = useState('appointments');

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <h1 className="text-3xl font-bold text-center mb-6">Doctor Dashboard</h1>

// //       {/* Tabs */}
// //       <div className="flex justify-center space-x-6 mb-6">
// //         <button
// //           className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
// //             activeTab === 'appointments'
// //               ? 'bg-blue-600 text-white'
// //               : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
// //           }`}
// //           onClick={() => setActiveTab('appointments')}
// //         >
// //           Appointment Requests
// //         </button>

// //         <button
// //           className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
// //             activeTab === 'overview'
// //               ? 'bg-blue-600 text-white'
// //               : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
// //           }`}
// //           onClick={() => setActiveTab('overview')}
// //         >
// //           Overview (Coming Soon)
// //         </button>
// //       </div>

// //       {/* Tab Content */}
// //       <div className="bg-white shadow-md rounded-lg p-4">
// //         {activeTab === 'appointments' && (
// //           <DoctorAppointments token={localStorage.getItem('token')} />
// //         )}

// //         {activeTab === 'overview' && (
// //           <div className="text-center text-gray-500 py-10">
// //             📊 Overview tab coming soon.
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DoctorDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [loading, setLoading] = useState(false);

// const fetchAppointments = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No token found');
//       return;
//     }

//     setLoading(true);
//     const response = await axios.get(`${API_URL}/appointments/doctor`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     let data = response.data;
//     if (statusFilter) {
//       data = data.filter(appt => appt.status === statusFilter);
//     }

//     setAppointments(data);
//     setLoading(false);
//   } catch (error) {
//     console.error('Failed to fetch appointments:', error.message);
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchAppointments();
//   }, [statusFilter]);

// const handleStatusUpdate = async (id, newStatus) => {
//   try {
//     const token = localStorage.getItem('token');
//     const endpoint = newStatus === 'accepted' 
//       ? `${API_URL}/api/appointments/${id}/accept`
//       : newStatus === 'rejected'
//       ? `${API_URL}/api/appointments/${id}/reject`
//       : `${API_URL}/api/appointments/${id}`;

//     await axios.patch(
//       endpoint,
//       { status: newStatus },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     fetchAppointments();
//   } catch (error) {
//     console.error('Failed to update status:', error);
//   }
// };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

//       <div className="flex gap-4 mb-4 items-center">
//         <label className="text-sm font-medium">Filter by Status:</label>
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border px-3 py-1 rounded"
//         >
//           <option value="">All</option>
//           <option value="pending">Pending</option>
//           <option value="accepted">Accepted</option>
//           <option value="rejected">Rejected</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>

//       {loading ? (
//         <p>Loading appointments...</p>
//       ) : appointments.length === 0 ? (
//         <p>No appointments found.</p>
//       ) : (
//         appointments.map((appt) => (
//           <div
//             key={appt._id}
//             className="border rounded p-4 shadow flex justify-between items-center mb-4"
//           >
//             <div>
//               <p><strong>Dog:</strong> {appt.pet?.name}</p>
//               <p><strong>Owner:</strong> {appt.createdBy?.name} ({appt.createdBy?.email})</p>
//               <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
//               <p><strong>Time:</strong> {appt.time}</p>
//               <p><strong>Reason:</strong> {appt.reason}</p>
//               <p>
//                 <strong>Status:</strong>{' '}
//                 <span
//                   className={`ml-2 px-2 py-1 rounded text-white ${
//                     appt.status === 'pending'
//                       ? 'bg-yellow-500'
//                       : appt.status === 'accepted'
//                       ? 'bg-green-500'
//                       : appt.status === 'rejected'
//                       ? 'bg-red-500'
//                       : 'bg-gray-500'
//                   }`}
//                 >
//                   {appt.status}
//                 </span>
//               </p>
//             </div>

//             {appt.status === 'pending' && (
//               <div className="flex gap-2">
//                 <button
//                   className="bg-green-600 text-white px-3 py-1 rounded"
//                   onClick={() => handleStatusUpdate(appt._id, 'accepted')}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="bg-red-600 text-white px-3 py-1 rounded"
//                   onClick={() => handleStatusUpdate(appt._id, 'rejected')}
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default DoctorDashboard;



// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   Button,
//   Badge,
//   Card,
//   Row,
//   Col,
//   message,
//   Spin,
//   Space,
//   Typography
// } from 'antd';
// import {
//   CheckOutlined,
//   CloseOutlined,
//   CalendarOutlined,
//   SyncOutlined
// } from '@ant-design/icons';
// import api from '../api';

// const { Title } = Typography;

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState(null);
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     fetchAppointments();
//     fetchStats();
//   }, [filter]);

//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       let url = '/appointments/doctor';
//       if (filter !== 'all') {
//         url += `?status=${filter}`;
//       }

//       const response = await api.get(url);
//       console.log('Appointments API response:', response.data);

//       const data = response.data?.data;
//       setAppointments(Array.isArray(data) ? data : []);
//     } catch (error) {
//       message.error('Failed to fetch appointments');
//       console.error(error);
//       setAppointments([]); // fallback
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await api.get('/appointments/doctor/stats');
//       console.log('Stats API response:', response.data);
//       setStats(response.data?.data || {});
//     } catch (error) {
//       console.error('Failed to fetch stats', error);
//       setStats({});
//     }
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       await api.patch(`/doctor/appointments/${id}`, { status });
//       message.success(`Appointment ${status}`);
//       fetchAppointments();
//       fetchStats();
//     } catch (error) {
//       message.error(`Failed to ${status} appointment`);
//       console.error(error);
//     }
//   };

//   const columns = [
//     {
//       title: 'Pet',
//       dataIndex: ['pet', 'name'],
//       key: 'pet',
//       render: (text, record) => (
//         <div>
//           <strong>{text}</strong>
//           <div className="text-muted">{record.pet?.breed}, {record.pet?.age} years</div>
//         </div>
//       )
//     },
//     {
//       title: 'Owner',
//       dataIndex: ['createdBy', 'name'],
//       key: 'owner',
//       render: (text, record) => (
//         <div>
//           <div>{text}</div>
//           <div className="text-muted">{record.createdBy?.email}</div>
//           <div className="text-muted">{record.createdBy?.phone}</div>
//         </div>
//       )
//     },
//     {
//       title: 'Date & Time',
//       dataIndex: 'date',
//       key: 'datetime',
//       render: (date, record) => (
//         <div>
//           <div><CalendarOutlined /> {date}</div>
//           <div>{record.time}</div>
//         </div>
//       )
//     },
//     {
//       title: 'Reason',
//       dataIndex: 'reason',
//       key: 'reason',
//       ellipsis: true
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => {
//         let statusProps = {};
//         switch (status) {
//           case 'pending':
//             statusProps = { status: 'processing', text: 'Pending' };
//             break;
//           case 'accepted':
//             statusProps = { status: 'success', text: 'Accepted' };
//             break;
//           case 'rejected':
//             statusProps = { status: 'error', text: 'Rejected' };
//             break;
//           case 'completed':
//             statusProps = { status: 'default', text: 'Completed' };
//             break;
//           default:
//             statusProps = { status: 'default', text: status };
//         }
//         return <Badge {...statusProps} />;
//       }
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           {record.status === 'pending' && (
//             <>
//               <Button
//                 type="primary"
//                 icon={<CheckOutlined />}
//                 onClick={() => handleStatusUpdate(record._id, 'accepted')}
//               >
//                 Accept
//               </Button>
//               <Button
//                 danger
//                 icon={<CloseOutlined />}
//                 onClick={() => handleStatusUpdate(record._id, 'rejected')}
//               >
//                 Reject
//               </Button>
//             </>
//           )}
//           {record.status === 'accepted' && (
//             <Button
//               type="default"
//               icon={<SyncOutlined />}
//               onClick={() => handleStatusUpdate(record._id, 'completed')}
//             >
//               Complete
//             </Button>
//           )}
//         </Space>
//       )
//     }
//   ];

//   const statusFilters = [
//     { label: 'All', value: 'all' },
//     { label: 'Pending', value: 'pending' },
//     { label: 'Accepted', value: 'accepted' },
//     { label: 'Rejected', value: 'rejected' },
//     { label: 'Completed', value: 'completed' }
//   ];

//   return (
//     <div className="doctor-dashboard">
//       <Title level={2}>Doctor Dashboard</Title>

//       {stats && (
//         <Row gutter={16} style={{ marginBottom: 24 }}>
//           <Col span={6}>
//             <Card>
//               <Title level={5}>Today's Appointments</Title>
//               <p style={{ fontSize: 24, margin: 0 }}>{stats.todaysCount || 0}</p>
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card>
//               <Title level={5}>Pending</Title>
//               <p style={{ fontSize: 24, margin: 0 }}>{stats.byStatus?.pending || 0}</p>
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card>
//               <Title level={5}>Accepted</Title>
//               <p style={{ fontSize: 24, margin: 0 }}>{stats.byStatus?.accepted || 0}</p>
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card>
//               <Title level={5}>Completed</Title>
//               <p style={{ fontSize: 24, margin: 0 }}>{stats.byStatus?.completed || 0}</p>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
//         <span>Filter by status:</span>
//         <Space.Compact>
//           {statusFilters.map(filterItem => (
//             <Button
//               key={filterItem.value}
//               type={filter === filterItem.value ? 'primary' : 'default'}
//               onClick={() => setFilter(filterItem.value)}
//             >
//               {filterItem.label}
//             </Button>
//           ))}
//         </Space.Compact>
//       </Space>

//       <Spin spinning={loading}>
//         {Array.isArray(appointments) && appointments.length > 0 ? (
//           <Table
//             columns={columns}
//             dataSource={appointments}
//             rowKey="_id"
//             pagination={{
//               pageSize: 10,
//               showSizeChanger: false
//             }}
//             }}
//             scroll={{ x: true }}
//           />
//         ) : (
//           <Card style={{ textAlign: 'center', marginTop: 20 }}>
//             <Title level={4}>No appointments found</Title>
//             <p>You currently have no {filter === 'all' ? '' : filter} appointments.</p>
//           </Card>
//         )}
//       </Spin>
//     </div>
//   );
// };

// export default DoctorDashboard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [updatingId, setUpdatingId] = useState(null);

//   // Get the JWT token from localStorage (or wherever you store it)
//   const token = localStorage.getItem('token');

// const fetchAppointments = async () => {
//   try {
//     setLoading(true);
//     const res = await axios.get('/api/appointments/doctor/appointments', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log('Fetched appointments:', res.data);  // <--- Add this line

//     setAppointments(res.data);
//     setLoading(false);
//   } catch (err) {
//     setError('Failed to load appointments');
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const handleUpdateStatus = async (id, status) => {
//     try {
//       setUpdatingId(id);
//       await axios.patch(
//         `/api/appointments/doctor/appointments/${id}`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // Refresh list after update
//       fetchAppointments();
//       setUpdatingId(null);
//     } catch (err) {
//       alert('Failed to update appointment status');
//       setUpdatingId(null);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Doctor Dashboard - Appointments</h1>

//       {loading && <p>Loading appointments...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {!loading && !error && appointments.length === 0 && <p>No appointments found.</p>}

//       {!loading && appointments.length > 0 && (
//         <table className="min-w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">Pet Name</th>
//               <th className="border px-4 py-2">Species</th>
//               <th className="border px-4 py-2">Breed</th>
//               <th className="border px-4 py-2">Owner</th>
//               <th className="border px-4 py-2">Date</th>
//               <th className="border px-4 py-2">Time</th>
//               <th className="border px-4 py-2">Reason</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
// <tbody>
//   {Array.isArray(appointments) && appointments.length > 0 ? (
//     appointments.map((appt) => (
//       <tr key={appt._id} className="text-center">
//         <td className="border px-4 py-2">{appt.pet?.name || '-'}</td>
//         <td className="border px-4 py-2">{appt.pet?.species || '-'}</td>
//         <td className="border px-4 py-2">{appt.pet?.breed || '-'}</td>
//         <td className="border px-4 py-2">{appt.createdBy?.name || '-'}</td>
//         <td className="border px-4 py-2">{appt.date}</td>
//         <td className="border px-4 py-2">{appt.time}</td>
//         <td className="border px-4 py-2">{appt.reason}</td>
//         <td className="border px-4 py-2 capitalize">{appt.status}</td>
//         <td className="border px-4 py-2 space-x-2">
//           {appt.status === 'pending' ? (
//             <>
//               <button
//                 disabled={updatingId === appt._id}
//                 onClick={() => handleUpdateStatus(appt._id, 'accepted')}
//                 className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//               >
//                 Accept
//               </button>
//               <button
//                 disabled={updatingId === appt._id}
//                 onClick={() => handleUpdateStatus(appt._id, 'rejected')}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//               >
//                 Reject
//               </button>
//             </>
//           ) : (
//             <span>-</span>
//           )}
//         </td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="9" className="text-center py-4 text-gray-500">
//         No appointments found.
//       </td>
//     </tr>
//   )}
// </tbody>

//         </table>
//       )}
//     </div>


//   );
// };

// export default DoctorDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;



const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/appointments/doctor/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };


  
  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API_URL}/appointments/doctor/appointments/${id}`, {
        status
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAppointments(); // Refresh
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Pet</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Owner</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id}>
              <td className="border p-2">{appt.pet?.name}</td>
              <td className="border p-2">{appt.date}</td>
              <td className="border p-2">{appt.time}</td>
              <td className="border p-2">{appt.createdBy?.name}</td>
              <td className="border p-2">{appt.status}</td>
              <td className="border p-2">
                {appt.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(appt._id, "accepted")}
                      className="bg-green-600 text-white px-2 py-1 mr-2 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(appt._id, "rejected")}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDashboard;
