
import Illustration from "./signup/Illustration"
import Form from "./signup/Form"

export default function SignupForm() {

  return (
    <div className="sm:min-h-screen w-full flex bg-custom-gradient">
      
      {/* LEFT ILLUSTRATION SECTION */}
      <Illustration/>

      {/* RIGHT SIGNUP CARD */}
      <Form/>
    </div>
  )
}
