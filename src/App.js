import { SignInPage } from "./pages/SignInPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ClassPage } from "./pages/ClassPage";
import { WelcomePage } from "./pages/WelcomePage";
import { classLoader } from "./pages/ClassPage";
import { StudentPage, studentLoader } from "./pages/StudentPage";
import { AllStudentPage, allStudentLoader } from "./pages/AllStudentPage";
import { UploadPage } from "./pages/UploadPage";
import PermissionProvider from "./components/PermissionProvider";
import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { TestPage } from "./pages/TestPage";
import { ErrorPage } from "./pages/ErrorPage";
import { ClassesPage, classesLoader } from "./pages/ClassesPage";
import { GuardedRoute } from "./components/GuardedRoute";
import { updateProfile } from "firebase/auth";

function App() {
  const [user, setUser] = useState(async () => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdTokenResult();
      await updateProfile(user, {
        photoURL: "https://picsum.photos/200",
      });
      return token;
    } else {
      return user;
    }
  });

  useEffect(() => {
    auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const claims = await firebaseUser.getIdTokenResult();
        setUser({
          claims: {
            admin: true,
            iss: "https://securetoken.google.com/szakdoga-a8fb9",
            aud: "szakdoga-a8fb9",
            auth_time: 1706734314,
            user_id:
              "a6b5373d8c486764f3bd9012a57bcb4db602f4a7b8fa0a64fa02e0136693b778",
            sub: "a6b5373d8c486764f3bd9012a57bcb4db602f4a7b8fa0a64fa02e0136693b778",
            iat: 1706734314,
            exp: 1706737914,
            firebase: {
              identities: {},
              sign_in_provider: "custom",
            },
          },
          token:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NjI5NzU5NmJiNWQ4N2NjOTc2Y2E2YmY0Mzc3NGE3YWE5OTMxMjkiLCJ0eXAiOiJKV1QifQ.eyJhZG1pbiI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3N6YWtkb2dhLWE4ZmI5IiwiYXVkIjoic3pha2RvZ2EtYThmYjkiLCJhdXRoX3RpbWUiOjE3MDY3MzQzMTQsInVzZXJfaWQiOiJhNmI1MzczZDhjNDg2NzY0ZjNiZDkwMTJhNTdiY2I0ZGI2MDJmNGE3YjhmYTBhNjRmYTAyZTAxMzY2OTNiNzc4Iiwic3ViIjoiYTZiNTM3M2Q4YzQ4Njc2NGYzYmQ5MDEyYTU3YmNiNGRiNjAyZjRhN2I4ZmEwYTY0ZmEwMmUwMTM2NjkzYjc3OCIsImlhdCI6MTcwNjczNDMxNCwiZXhwIjoxNzA2NzM3OTE0LCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7fSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.fpvULPXEAFgcBIWQnmO3H6NntRREqPvA04IY1wWSnux4Y5WRbIQ9XtrnhR5A6waBnor9bzQfHVDQWOQ8Uie-PWryJjMdg7cUSoA_-kXvTg3clDBp5VvPhNvIBMd79ZmZOXhU5H_yklQboZuh4cCvsEXwBBTZmisWoDZByxpuUlzNQR4JVWsyS1Ee5D5A465Ftd4LlJmiynu0bSFugR6QKWB_ya3tp98pcfZ7JlotR_S-DI0ggYbzhQzz5ptVQ1h92rfiKqfcFIaRfwfUY8uzaljbm0ANDFYVk1mXSPe9cePpxrNRPvld8HgjJ-KuJiAWFid-IgfeDwXTtE4PeGM1Ag",
          authTime: "Wed, 31 Jan 2024 20:51:54 GMT",
          issuedAtTime: "Wed, 31 Jan 2024 20:51:54 GMT",
          expirationTime: "Wed, 31 Jan 2024 21:51:54 GMT",
          signInProvider: "custom",
          signInSecondFactor: null,
        });
      } else {
        setUser({
          claims: {
            admin: true,
            iss: "https://securetoken.google.com/szakdoga-a8fb9",
            aud: "szakdoga-a8fb9",
            auth_time: 1706734314,
            user_id:
              "a6b5373d8c486764f3bd9012a57bcb4db602f4a7b8fa0a64fa02e0136693b778",
            sub: "a6b5373d8c486764f3bd9012a57bcb4db602f4a7b8fa0a64fa02e0136693b778",
            iat: 1706734314,
            exp: 1706737914,
            firebase: {
              identities: {},
              sign_in_provider: "custom",
            },
          },
          token:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NjI5NzU5NmJiNWQ4N2NjOTc2Y2E2YmY0Mzc3NGE3YWE5OTMxMjkiLCJ0eXAiOiJKV1QifQ.eyJhZG1pbiI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3N6YWtkb2dhLWE4ZmI5IiwiYXVkIjoic3pha2RvZ2EtYThmYjkiLCJhdXRoX3RpbWUiOjE3MDY3MzQzMTQsInVzZXJfaWQiOiJhNmI1MzczZDhjNDg2NzY0ZjNiZDkwMTJhNTdiY2I0ZGI2MDJmNGE3YjhmYTBhNjRmYTAyZTAxMzY2OTNiNzc4Iiwic3ViIjoiYTZiNTM3M2Q4YzQ4Njc2NGYzYmQ5MDEyYTU3YmNiNGRiNjAyZjRhN2I4ZmEwYTY0ZmEwMmUwMTM2NjkzYjc3OCIsImlhdCI6MTcwNjczNDMxNCwiZXhwIjoxNzA2NzM3OTE0LCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7fSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.fpvULPXEAFgcBIWQnmO3H6NntRREqPvA04IY1wWSnux4Y5WRbIQ9XtrnhR5A6waBnor9bzQfHVDQWOQ8Uie-PWryJjMdg7cUSoA_-kXvTg3clDBp5VvPhNvIBMd79ZmZOXhU5H_yklQboZuh4cCvsEXwBBTZmisWoDZByxpuUlzNQR4JVWsyS1Ee5D5A465Ftd4LlJmiynu0bSFugR6QKWB_ya3tp98pcfZ7JlotR_S-DI0ggYbzhQzz5ptVQ1h92rfiKqfcFIaRfwfUY8uzaljbm0ANDFYVk1mXSPe9cePpxrNRPvld8HgjJ-KuJiAWFid-IgfeDwXTtE4PeGM1Ag",
          authTime: "Wed, 31 Jan 2024 20:51:54 GMT",
          issuedAtTime: "Wed, 31 Jan 2024 20:51:54 GMT",
          expirationTime: "Wed, 31 Jan 2024 21:51:54 GMT",
          signInProvider: "custom",
          signInSecondFactor: null,
        });
      }
    });
  }, []);
  console.log("user", user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<WelcomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          element={
            <GuardedRoute
              AccessibleTo={["tanar", "admin"]}
              redirectRoute="/error"
            />
          }
        >
          <Route
            path="/classes"
            element={<ClassesPage />}
            loader={classesLoader}
          />
        </Route>
        <Route
          element={
            <GuardedRoute
              AccessibleTo={["tanar", "admin"]}
              redirectRoute="/error"
            />
          }
        >
          <Route
            path="/classes/:classId"
            element={<ClassPage />}
            loader={({ params }) => classLoader(params)}
          />
        </Route>
        <Route
          element={
            <GuardedRoute
              AccessibleTo={["diak", "tanar", "admin"]}
              redirectRoute="/error"
            />
          }
        >
          <Route
            path="/students/:studentId"
            element={<StudentPage />}
            loader={({ params }) => studentLoader(params, user.claims)}
          />
        </Route>
        <Route
          element={
            <GuardedRoute
              AccessibleTo={["tanar", "admin"]}
              redirectRoute="/error"
            />
          }
        >
          <Route
            path="/students"
            element={<AllStudentPage />}
            loader={() => allStudentLoader(user.claims)}
          />
        </Route>
        <Route
          element={
            <GuardedRoute AccessibleTo={["admin"]} redirectRoute="/error" />
          }
        >
          <Route path="/upload" element={<UploadPage />} />
        </Route>
        <Route path="/error" element={<ErrorPage />} />
      </Route>
    )
  );
  return (
    <PermissionProvider permissions={user ? user.claims : { loggedOut: true }}>
      <RouterProvider router={router} />
    </PermissionProvider>
  );
}

export default App;
