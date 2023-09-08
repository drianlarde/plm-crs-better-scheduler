# Better PLM Class Schedule ![GitHub release (latest by date)](https://img.shields.io/github/v/release/drianlarde/plm-crs-better-scheduler)

Better PLM Class Schedule is a web extension that enhances the class scheduling experience for students. It allows students to convert their class schedule into a format that can be easily imported into Google Calendar. Additionally, it provides a feature to bulk delete events in Google Calendar.

## Chrome Installation
1. Go to https://github.com/drianlarde/plm-crs-better-scheduler
2. Open `Code` button and click `Download ZIP`
3. Extract the downloaded `.zip` file (I recommend to put it in Desktop)
4. Enter `chrome://extensions/` in Chrome's URL
5. Turn on the `Developer Mode` switch
6. Click `Load Unpacked` button
7. Open the extracted folder then inside it there's a `plm-crs-better-scheduler/chrome` folder. Select the `chrome` folder.
8. Enjoy!

## Firefox Installation
- Our Firefox extension is currently being reviewed by Mozzila. After approval, it will be publicly available in Mozilla add-ons.
- Available in Firefox Developer

## Firefox Installation Workaround
1. Go to https://github.com/drianlarde/plm-crs-better-scheduler
2. Open `Code` button and click `Download ZIP`
3. Extract the downloaded `.zip` file (I recommend to put it in Desktop)
4. Enter `about:debugging#/runtime/this-firefox` in Firefox URL
5. Click `Load Temporary Add-on`
6. Select the `manifest.json` at `plm-crs-better-scheduler/firefox/manifest.json`
7. Enjoy! (Note: This is temporary)

## Firefox Developer Installation
1. Go to https://github.com/drianlarde/plm-crs-better-scheduler
2. Open `Code` button and click `Download ZIP`
3. Extract the downloaded `.zip` file (I recommend to put it in Desktop)
4. Enter `about:config` in Firefox Developer URL
5. Search for `xpinstall.signatures.required` and update it to `false`
6. Enter `about:addons` then click the gear/settings button.
7. Then click `Install Add-on From File`
8. Select the `.zip` file inside `firefox/web-ext-artifacts/better_plm_crs_class_schedule-1.0.zip`
9. Enjoy!

## Usage

### Converting Class Schedule to Google Calendar

1. Navigate to the [PLM CRS Class Schedule page](https://web1.plm.edu.ph/crs/studentaccess/enlistment_view.php).
<img width="1437" alt="image" src="https://github.com/drianlarde/plm-crs-better-scheduler/assets/69323240/3526b79f-f74e-4d0e-9a66-d1893893ed3e">

2. Open the Better PLM Class Schedule extension.
<img width="1432" alt="image" src="https://github.com/drianlarde/plm-crs-better-scheduler/assets/69323240/4dd6bdbf-672a-49c2-a148-8918066a0feb">

3. Set the starting and ending dates for the semester or the desired duration.
<img width="530" alt="image" src="https://github.com/drianlarde/plm-crs-better-scheduler/assets/69323240/79189e31-cccc-48eb-90b7-1e15e3b24343">

4. Click the `Convert` button. This will download a .csv file containing your class schedule.
<img width="240" alt="image" src="https://github.com/drianlarde/plm-crs-better-scheduler/assets/69323240/c6f27183-7e15-4494-a3bd-555613813ae8">

5. Navigate to the [Google Calendar Import Events Settings page](https://calendar.google.com/calendar/u/1/r/settings/export).
<img width="1438" alt="image" src="https://github.com/drianlarde/plm-crs-better-scheduler/assets/69323240/9cc131ec-4268-4144-9ecb-64f7ab69a8b2">

6. Click `Select file from your computer` and select the downloaded .csv file.
<img width="710" alt="image" src="https://github.com/drianlarde/plm-crs-better-scheduler/assets/69323240/de15b8dd-e185-4d54-8893-0844b20854c9">

7. Click `Import`.
<img width="398" alt="image" src="https://github.com/drianlarde/plm-crs-better-scheduler/assets/69323240/0fb407be-7c80-4c4b-8f97-d0fc131f5794">

8. Your class schedule should now be visible in Google Calendar.

### Deleting Events

1. Navigate to the [Google Calendar schedule view](https://calendar.google.com/calendar/u/0/r/agenda).
<img width="1439" alt="image" src="https://github.com/drianlarde/plm-crs-better-scheduler/assets/69323240/6dc3e191-6262-4975-9830-0635759a0574">

2. Ensure that you want to delete all events currently visible in the agenda view.

3. If you're sure, click `Delete All Events`. This will automate the deletion process.
<img width="912" alt="image" src="https://github.com/drianlarde/plm-crs-better-scheduler/assets/69323240/7e7870db-783c-4d06-8814-87904e080616">

Please note: The delete feature will remove all events visible in the agenda view. Please ensure you want to delete all events that came from the `.csv` file before proceeding.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## Support

If you find this project helpful, consider supporting its development:

- [Buy me a coffee](https://www.buymeacoffee.com/drianlarde)
- GCash: 09672296409