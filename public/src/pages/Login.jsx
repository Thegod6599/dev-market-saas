import styles from "./pageStyles/LoginPage.module.css"
import LoginForm from "../components/authUI/LoginForm.jsx"
import SignupForm from "../components/authUI/SignupForm.jsx"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <>
      <div className={styles.authContainer}>
      <AnimatePresence mode="sync">
      {isLogin ? 
      <motion.div key='login' className={styles.authAnimation}
        initial={{y: "100%"}}
        animate={{y: 0}}
        exit={{y: "-100%"}}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20
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
          stiffness: 200,
          damping: 20
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
