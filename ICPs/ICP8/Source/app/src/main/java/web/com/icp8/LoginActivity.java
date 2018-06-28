package web.com.icp8;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import org.apache.commons.lang3.StringUtils;

// Facebook Import
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.Profile;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

import java.util.Arrays;

public class LoginActivity extends AppCompatActivity {

    // Creating Variables for UserName, Password, Error Text
    EditText emailText;
    EditText passwordText;
    TextView errorText;
    CallbackManager callbackManager;
    LoginButton loginButton;
    Profile profile;

    private static final String EMAIL = "email";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Trying to fetch the text values by using Id
        emailText = findViewById(R.id.emailId);
        passwordText = findViewById(R.id.password);
        errorText = findViewById(R.id.errorText);

        FacebookSdk.sdkInitialize(getApplicationContext());

        // Checking if the facebook user is already logged in
        profile = Profile.getCurrentProfile();
        if(profile != null){
            Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
            intent.putExtra("emailId", "User from Facebook");
            startActivity(intent);
        }

        loginWithFacebook();
    }

    // On Click of the Button
    public void loginToHome(View view) {
        if(emptyCheck(emailText) || emptyCheck(passwordText)){
            // Set Error Text
            errorText.setText("Email Id or Password Cannot be Empty..");
        }else if(!(emailText.getText().toString().equalsIgnoreCase("kranthi") && passwordText.getText().toString().equals("kranthi"))){
            errorText.setText("Invalid Credentials..");
        }else{
            Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
            intent.putExtra("emailId", emailText.getText().toString());
            startActivity(intent);
        }
    }

    // Method to check if fields are empty or not
    private Boolean emptyCheck(EditText field){
        if(field != null && field.getText() != null && StringUtils.isNotEmpty(field.getText().toString())){
                return false;
        }
        return true;
    }

    private void loginWithFacebook(){
        callbackManager = CallbackManager.Factory.create();
        loginButton = (LoginButton) findViewById(R.id.login_button);
        loginButton.setReadPermissions(Arrays.asList(EMAIL));
        // If you are using in a fragment, call loginButton.setFragment(this);
        // Callback registration
        LoginManager.getInstance().registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
                intent.putExtra("emailId", "User from Facebook");
                startActivity(intent);
            }

            @Override
            public void onCancel() {
                // App code
                errorText.setText("Facebook Login Cancelled");
            }

            @Override
            public void onError(FacebookException exception) {
                // App code
                errorText.setText("Error when trying to login to facebook :"+exception.getMessage());
            }
        });
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        callbackManager.onActivityResult(requestCode, resultCode, data);
        super.onActivityResult(requestCode, resultCode, data);
    }
}
