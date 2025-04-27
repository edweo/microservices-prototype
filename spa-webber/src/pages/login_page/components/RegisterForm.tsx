import WebberInputField from "../../../components/WebberInputField.tsx";
import WebberButton from "../../../components/WebberButton.tsx";

interface Props {

  showLoginForm: () => void,
}

function RegisterForm({showLoginForm}: Props) {
  return (
      <div className="flex flex-col p-4 bg-secondary rounded w-full">
        <h1 className="text-2xl mb-8 text-onSecondary">Register</h1>
        <WebberInputField value={""}
                          setValue={(name: string) => {
                          }}
                          preventEvents={true}
                          label="Username"
        />
        <WebberInputField value={""}
                          setValue={(value: string) => {
                          }}
                          preventEvents={true}
                          label="Password"
                          className="mt-4"
        />
        <WebberButton text="Register"
                      onClick={() => {
                      }}
                      styleContainer="bg-primary mt-4"
                      styleText="text-onSecondary"
        />
        <div className="flex mt-4 flex-col justify-between">
          <h3 className="text-onSecondary cursor-pointer" onClick={showLoginForm}>
            Already have an account?
          </h3>
        </div>
      </div>
  )
}

export default RegisterForm;