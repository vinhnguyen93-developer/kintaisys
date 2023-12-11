"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./login.css";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <div className={styles.container}>
        <h1 className="title">Create Next App</h1>
        <div className={styles.content}>
          <h2>
            {" "}
            Signed in as {session.user.email} <br />
          </h2>
          <div classname={styles.btns}>
            <button className={styles.button} onClick={() => router.push("/")}>
              User Profile
            </button>
            <button
              className={styles.button}
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container-login">
      <img src="/logo_knen.png" alt="Example" />
      <div className={styles.content}>
        <p className="text-login">Welcome to CCK Timekeeper!</p>
        <button className="button-login" onClick={() => signIn()}>
          SIGN IN
        </button>
      </div>
    </div>
  );
}
