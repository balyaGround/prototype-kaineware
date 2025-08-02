// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../firebase/config";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errMsg, setErrMsg] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       const uid = userCred.user.uid;
//       const userDoc = await getDoc(doc(db, "users", uid));

//       if (!userDoc.exists()) {
//         setErrMsg("Akun tidak ditemukan di database.");
//         return;
//       }

//       const userData = userDoc.data();
//       const { role } = userData;

//       if (role === "owner") {
//         navigate("/dashboard/ringkasan");
//       } else if (role === "admin") {
//         navigate("/dashboardAdmin");
//       } else if (role === "kasir") {
//         navigate("/kasir");
//       } else {
//         setErrMsg("Role tidak dikenali.");
//       }
//     } catch (err) {
//       setErrMsg("Login gagal. Email atau password salah.");
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1562157873-818bc0726f4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         position: "relative",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(0,0,0,0.6)",
//           position: "absolute",
//           top: 0,
//           bottom: 0,
//           left: 0,
//           right: 0,
//         }}
//       ></div>

//       <div
//         className="container d-flex justify-content-center align-items-center"
//         style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}
//       >
//         <div
//           className="bg-white p-4 rounded shadow"
//           style={{ width: "100%", maxWidth: "400px" }}
//         >
//           <h3 className="text-center mb-4 text-primary">Login KaineWare</h3>
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <label>Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label>Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             {errMsg && (
//               <div className="alert alert-danger text-sm">{errMsg}</div>
//             )}
//             <button type="submit" className="btn btn-primary w-100">
//               Masuk
//             </button>
//           </form>
//           <p className="mt-3 text-center text-muted" style={{ fontSize: "0.9em" }}>
//             &copy; 2025 <strong>KaineWare</strong> - Sistem POS Kain Modern
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const userDoc = await getDoc(doc(db, "users", uid));

      if (!userDoc.exists()) {
        setErrMsg("Akun tidak ditemukan di database.");
        return;
      }

      const userData = userDoc.data();
      const { role } = userData;

      if (role === "owner") {
        navigate("/dashboard/ringkasan");
      } else if (role === "admin") {
        navigate("/dashboardAdmin");
      } else if (role === "kasir") {
        navigate("/kasir");
      } else {
        setErrMsg("Role tidak dikenali.");
      }
    } catch (err) {
      setErrMsg("Login gagal. Email atau password salah.");
    }
  };

  return (
    <div
     style={{
    backgroundImage: "url('/images/bg-login.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "40vh",
    position: "relative",
  }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      ></div>

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}
      >
        <div
          className={`bg-white p-4 rounded shadow ${animate ? "animate-login" : ""}`}
          style={{ width: "100%", maxWidth: "400px", transition: "all 0.5s ease-in-out" }}
        >
          <h3 className="text-center mb-4 text-primary">Login KaineWare</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errMsg && (
              <div className="alert alert-danger text-sm">{errMsg}</div>
            )}
            <button type="submit" className="btn btn-primary w-100">
              Masuk
            </button>
          </form>
          <p className="mt-3 text-center text-muted" style={{ fontSize: "0.9em" }}>
            &copy; 2025 <strong>KaineWare</strong> — Sistem POS Kain Modern
          </p>
        </div>
      </div>

      {/* Animasi Style */}
      <style>
        {`
        .animate-login {
          transform: translateY(0);
          opacity: 1;
        }
        .animate-login-start {
          transform: translateY(20px);
          opacity: 0;
        }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
