package web.com.mobile_lab1;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.Toast;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

/**
 * Created by gangi on 7/13/2018.
 */

public class GuardianNewsActivity extends AppCompatActivity{

    EditText searchText;
    ListView listView;
    Button searchGuardianButton;

    private static final String GUARDIAN_API_URL= "https://content.guardianapis.com/search?api-key=918be697-d3b5-4008-a8a2-8ce583a40f27&q=";
    Hashtable<String, String> hashtable = new Hashtable<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_guardian);

        if (android.os.Build.VERSION.SDK_INT > 9)
        {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }

        searchText = findViewById(R.id.guardianSearch);
        listView = findViewById(R.id.listView);
        searchGuardianButton = findViewById(R.id.searchGuardian);

        // Creating Item Click Listener.
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                String picked = String.valueOf(adapterView.getItemAtPosition(i));
                // Convert the String URL into a URI object (to pass into the Intent constructor)
                // Fetching URI from HashTable created.
                Uri webURI = Uri.parse(hashtable.get(picked));
                // New intent to view the earthquake URI.Send the intent to launch a new activity
                Intent eqIntent = new Intent(Intent.ACTION_VIEW, webURI);
                startActivity(eqIntent);
            }
        });
    }

    // On Click of Search Guardian API
    public void searchGuardianAPI(View view) {
        if(searchText != null && StringUtils.isNotEmpty(searchText.getText().toString())){
            // If search Text is Present
            fetchDetailsAndSet(searchText.getText().toString());
        }else{
            // Make a Toast saying Text Field should not be Empty
            Toast.makeText(GuardianNewsActivity.this, "Input text should not be Empty !", Toast.LENGTH_LONG).show();
        }
    }

    private void fetchDetailsAndSet(String searchString) {
        //  URL object to store the url for a given string
        URL url = null;
        // A string to store the response obtained from rest call in the form of string
        String jsonResponse = "";
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader;
        URLConnection urlConnection;
        String apiURL = GUARDIAN_API_URL+searchString;
        System.out.println(apiURL);
        try {
            // Creating a URL from the API URL string and making a GET request to it
            url = new URL(apiURL);
            // Reading from the Url Connection and store it as a string(jsonResponse)
            urlConnection = url.openConnection();
            // wrap the urlconnection in a bufferedreader
            bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

            String line;
            while ((line = bufferedReader.readLine()) !=  null) {
                // Appending the Line to StringBuilder
                stringBuilder.append(line);
            }
            // Closing Buffered Reader.
            if(bufferedReader != null){
                bufferedReader.close();
            }
            // Converting string builder to String and using it as JSON Response.
            jsonResponse = stringBuilder.toString();

            // Parsing the JSON Response.
            JSONObject jsonObject = new JSONObject(jsonResponse).getJSONObject("response");
            // Fetching 'results' array.
            JSONArray jsonArray = (JSONArray) jsonObject.get("results");

            List<String> stringList = new ArrayList<>();
            // Iterating the 'results' list
            for(int i =0;i < jsonArray.length(); i++){
                // Getting each JSON Object
                JSONObject json = jsonArray.getJSONObject(i);
                // Fetching WebTitle
                String webTitle = json.getString("webTitle");
                String webURL = json.getString("webUrl");
                // Adding to List
                stringList.add(webTitle);
                // Adding to HashTable
                hashtable.put(webTitle, webURL);
            }
            // Creating List Adapter
            ArrayAdapter listAdapter = new ArrayAdapter<String>(this, R.layout.activity_listview, stringList);
            // Setting Adapter to List View.
            listView.setAdapter(listAdapter);
            // Hiding Text, Button
            searchText.setVisibility(View.INVISIBLE);
            searchGuardianButton.setVisibility(View.INVISIBLE);
        } catch (Exception e) {
            Log.e(GuardianNewsActivity.class.getSimpleName(), "Exception:  ", e);
        }
    }
}
