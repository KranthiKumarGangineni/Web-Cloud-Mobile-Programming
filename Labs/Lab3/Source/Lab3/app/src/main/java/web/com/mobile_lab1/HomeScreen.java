package web.com.mobile_lab1;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

/**
 * Created by gangi on 7/13/2018.
 */

public class HomeScreen extends AppCompatActivity{

    TextView greetingText;

    // Greeting UserName - Default
    String userName = "Guest";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        // Fetching Email Id/ Twitter Username from Other Activities.
        if(getIntent() != null){
            userName = getIntent().getStringExtra("username");
        }
        // Setting Greeting Text
        greetingText = findViewById(R.id.greeting);
        greetingText.setText("Hi, "+ userName);
    }

    // On Click of Machine Learning API along with Camera Feature.
    public void machineLearning(View view) {
        Intent intent = new Intent(HomeScreen.this, MachineLearningActivity.class);
        startActivity(intent);
    }

    // On Click of Machine Learning API along with Camera Feature.
    public void guardianNews(View view) {
        // Redirecting to Guardian API Activity
        Intent intent = new Intent(HomeScreen.this, GuardianNewsActivity.class);
        startActivity(intent);
    }
}
