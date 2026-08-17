import styles from "./pageStyles/LoginPage.module.css"
import LoginForm from "../components/authUI/LoginForm.jsx"
import SignupForm from "../components/authUI/SignupForm.jsx"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useAuth } from "../hooks/useAuth"

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const { user, profile, loading, isAuthenticated } = useAuth();
  
  return (
    <>
      <div>
        <p>Loading: {loading ? "Yes" : "no"}</p>
        <p>Authenticated: {isAuthenticated ? "yes" : "no"}</p>
        <p>User: {user ? user.email : "None"}</p>
        <p>Profile: {profile ? "loaded" : "none"}</p>
      </div>
      <div className={styles.authContainer}>
      <AnimatePresence mode="sync">
      {isLogin ? 
      <motion.div key='login' className={styles.authAnimation}
        initial={{y: "100%"}}
        animate={{y: 0}}
        exit={{y: "-100%"}}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 15,
          mass: 1.5,
          bounce: 2
        }}
        >
      <LoginForm onSwitch={() => setIsLogin(false)}/>
      </motion.div>
      : 
      <motion.div key='signup' className={styles.authAnimation}
        initial={{y: "100%"}}
        animate={{y: 0}}
        exit={{y: "-100%"}}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 15,
          mass: 1.5,
          bounce: 2
        }}
        >
      <SignupForm onSwitch={() => setIsLogin(true)}/>
      </motion.div>
      }
      </AnimatePresence>
      </div>
    </>
  );
}

export default Login;
