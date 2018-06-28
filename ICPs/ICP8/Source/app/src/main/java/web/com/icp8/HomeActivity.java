package web.com.icp8;

import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.facebook.FacebookActivity;
import com.facebook.login.LoginManager;

import org.w3c.dom.Text;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by gangi on 6/28/2018.
 */

public class HomeActivity extends AppCompatActivity{

    TextView greetingText;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        String emailId = "Guest";
        if(getIntent() != null){
            emailId = getIntent().getStringExtra("emailId");
        }

        greetingText = findViewById(R.id.greeting);
        greetingText.setText("Hello, "+emailId);
    }

    public void logoutFromApp(View view) {
        LoginManager.getInstance().logOut();
        Intent intent = new Intent(HomeActivity.this, LoginActivity.class);
        startActivity(intent);
    }
}
