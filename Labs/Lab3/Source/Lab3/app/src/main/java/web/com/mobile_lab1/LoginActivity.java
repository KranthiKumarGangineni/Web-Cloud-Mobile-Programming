package web.com.mobile_lab1;

import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.twitter.sdk.android.core.Callback;
import com.twitter.sdk.android.core.Result;
import com.twitter.sdk.android.core.Twitter;
import com.twitter.sdk.android.core.TwitterAuthToken;
import com.twitter.sdk.android.core.TwitterCore;
import com.twitter.sdk.android.core.TwitterException;
import com.twitter.sdk.android.core.TwitterSession;
import com.twitter.sdk.android.core.identity.TwitterLoginButton;

import org.apache.commons.lang3.StringUtils;

/**
 * Created by Kranthi on 2/22/2018.
 */

public class LoginActivity extends AppCompatActivity {

    private EditText loginEmail;
    private EditText loginPassword;
    private TextView errorText;

    // Database Helper
    DatabaseHelper dbHelper;

    //Declaring Twitter loginButton
    TwitterLoginButton loginButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Initializing Twitter Application - Before Setting Content View
        Twitter.initialize(this);
        setContentView(R.layout.activity_login);

        loginEmail = findViewById(R.id.loginEmailAddress);
        loginPassword = findViewById(R.id.loginPassword);
        errorText = findViewById(R.id.loginError);

        dbHelper = new DatabaseHelper(this);

        //Instantiating loginButton
        loginButton = (TwitterLoginButton) findViewById(R.id.login_button);

        /*
          Adding a callback to loginButton
          These statements will execute when loginButton is clicked
         */
        loginButton.setCallback(new Callback<TwitterSession>() {
            @Override
            public void success(Result<TwitterSession> result) {
                /*
                  This provides TwitterSession as a result
                  This will execute when the authentication is successful
                 */
                TwitterSession session = TwitterCore.getInstance().getSessionManager().getActiveSession();
                TwitterAuthToken authToken = session.getAuthToken();
                String token = authToken.token;
                String secret = authToken.secret;

                //Calling login method and passing twitter session
                login(session);
            }

            @Override
            public void failure(TwitterException exception) {
                //Displaying Toast message
                Toast.makeText(LoginActivity.this, "Authentication failed!", Toast.LENGTH_LONG).show();
            }
        });
    }

    // OnClick of Register
    public void navigateToRegisterScreen(View view) {
        Intent redirect = new Intent(LoginActivity.this, RegistrationActivity.class);
        startActivity(redirect);
    }

    // OnClick of Login
    public void login(View view) {
        // Basic Validations.
        if (!(returnValidationForField(loginEmail) && returnValidationForField(loginPassword))) {
            errorText.setText("Fields cannot be empty");
            errorText.setVisibility(View.VISIBLE);
        } else{
            // Checking if the user's email Id already exist or not
            Cursor userDetail = dbHelper.checkIfUserExist(loginEmail.getText().toString());
            if(userDetail.getCount() == 0){
                // Throw Error Saying Invalid Email, SignUp to Continue
                errorText.setText("You "+loginEmail.getText().toString()+" haven't signedup yet, Please signup for Smart" +
                        "Shopping");
                errorText.setVisibility(View.VISIBLE);
            }else{
                // If User Mail Exist, Check if Password is correct or not for that emailId
                Cursor user = dbHelper.checkIfPasswordIsCorrect(loginEmail.getText().toString(),
                        loginPassword.getText().toString());
                if(user.getCount() == 0){
                    // Throw Error for Wrong Password
                    errorText.setText("Invalid Password for "+ loginEmail.getText().toString() +", Please try with Valid One");
                    errorText.setVisibility(View.VISIBLE);
                }else{
                    while(user.moveToNext()) {
                        Intent pageRedirect = new Intent(LoginActivity.this, HomeScreen.class);
                        // Sending the Email Id to other Activity
                        pageRedirect.putExtra("username",user.getString(3));
                        startActivity(pageRedirect);
                    }
                }
            }
        }
    }

    // Common Method for Checking Not Null, StringUtils Empty
    private boolean returnValidationForField(EditText text) {
        if (text != null && StringUtils.isNotBlank(text.getText().toString())) {
            return true;
        }
        return false;
    }

    /**
     * @param session
     * This method will get username using session and start a new activity where username will be displayed
     */
    public void login(TwitterSession session)
    {
        // Fetching Username from Session
        String username = session.getUserName();
        Intent intent = new Intent(LoginActivity.this, HomeScreen.class);
        // Passing username to another activity
        intent.putExtra("username", username);
        startActivity(intent);
    }

    /**
     * @param requestCode - we'll set it to REQUEST_CAMERA
     * @param resultCode - this will store the result code
     * @param data - data will store an intent
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Pass the activity result to the login button.
        loginButton.onActivityResult(requestCode, resultCode, data);
    }
}
