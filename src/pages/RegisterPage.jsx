import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthLink from "../components/AuthLink";
import SocialButton from "../components/SocialButton";

import Form from "../components/Form";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";

import Divider from "../components/divider";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Register"
          subtitle="Fill out the form correctly"
        />

        <Form>
          <TextInput
            label="Full Name"
            placeholder="Enter Your Full Name"
          />

          <TextInput
            label="Email"
            type="email"
            placeholder="Enter Your Email"
          />

          <PasswordInput label="Password" />
          <PasswordInput label="Confirm Password" />

          <PrimaryButton>Register</PrimaryButton>
        </Form>

        <AuthLink
          text="Have an account?"
          linkText="Login"
          href="/login"
        />

        <Divider text="Or" />

        <SocialButton/>
      </AuthCard>
    </AuthLayout>
  );
}
