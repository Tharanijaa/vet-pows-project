// // import React, { createContext, useContext, useState } from 'react';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(() => {
// //     const role = localStorage.getItem('userRole');
// //     const token = localStorage.getItem('token');
// //     const userid = localStorage.getItem('userid');
// //     return role && token && userid ? { role, token, userid } : null;
// //   });

// //   const login = (role, token, userid) => {
// //     localStorage.setItem('userRole', role);
// //     localStorage.setItem('token', token);
// //     localStorage.setItem('userid', userid);
// //     setUser({ role, token, userid });
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('userRole');
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('userid');
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// };

// export const useAuth = () => useContext(AuthContext);
