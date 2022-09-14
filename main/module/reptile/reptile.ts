/* eslint-disable @typescript-eslint/no-unused-vars */
import { net } from "electron";
import puppeteer from "puppeteer";

const url = "https://www.douyin.com/video/7141326473436171551";
const cookie =
  "douyin.com; ttwid=1%7CO4m60a5HNDqSES-DKLSRBsv9oBz45D7kRr20-LCeNXI%7C1663122854%7C094c7f9d8eb7e4f0c400c24af3b4f718f2eea679337037c3a3691f3310075df0; douyin.com; strategyABtestKey=1663122856.406; s_v_web_id=verify_l810epi9_FMFsfrRa_AeI7_4ZaU_8Lta_0qfPCOMAoBn5; passport_csrf_token=98638e7a6cff09ef45c237e5646bd2ac; passport_csrf_token_default=98638e7a6cff09ef45c237e5646bd2ac; ttcid=f208e31d5bd543d5914a25e0848df7cb26; n_mh=MUMSnAPppd4UE4O9BEspY8bGd5QelvNwp3SUVxpy1HQ; sso_uid_tt=cb156e2df1cc93aafeecac6c5c79e383; sso_uid_tt_ss=cb156e2df1cc93aafeecac6c5c79e383; toutiao_sso_user=f6cced66219762a8462a01de0c186946; toutiao_sso_user_ss=f6cced66219762a8462a01de0c186946; sid_ucp_sso_v1=1.0.0-KGMxOGU5OWFkNWIwNjM4NmEwMDdlOTk2NjkyNzhkMTU1NTYwY2Q2N2MKHQi8uISpxAIQw_uEmQYY7zEgDDDd_YvTBTgGQPQHGgJsZiIgZjZjY2VkNjYyMTk3NjJhODQ2MmEwMWRlMGMxODY5NDY; ssid_ucp_sso_v1=1.0.0-KGMxOGU5OWFkNWIwNjM4NmEwMDdlOTk2NjkyNzhkMTU1NTYwY2Q2N2MKHQi8uISpxAIQw_uEmQYY7zEgDDDd_YvTBTgGQPQHGgJsZiIgZjZjY2VkNjYyMTk3NjJhODQ2MmEwMWRlMGMxODY5NDY; odin_tt=fc3ffeb9865d738343fa60a9c802934d57190ff3ffafb5a5e4679a1b349311a567611b62dfd18ba43c340a53b6c80cf0; passport_auth_status=f366e086e23886fc848ac7cfffd8f76d%2C; passport_auth_status_ss=f366e086e23886fc848ac7cfffd8f76d%2C; sid_guard=02f4102e9ce0c863fa1acc085d6f828e%7C1663122883%7C5184000%7CSun%2C+13-Nov-2022+02%3A34%3A43+GMT; uid_tt=fea01547c0e251cf1f245aef77cba69d; uid_tt_ss=fea01547c0e251cf1f245aef77cba69d; sid_tt=02f4102e9ce0c863fa1acc085d6f828e; sessionid=02f4102e9ce0c863fa1acc085d6f828e; sessionid_ss=02f4102e9ce0c863fa1acc085d6f828e; sid_ucp_v1=1.0.0-KDE1ZDg5NGVhYWVmM2EyOWUxNTQyODU2OWE1OGEzZDczNmFiY2MwZTEKFwi8uISpxAIQw_uEmQYY7zEgDDgGQPQHGgJsZiIgMDJmNDEwMmU5Y2UwYzg2M2ZhMWFjYzA4NWQ2ZjgyOGU; ssid_ucp_v1=1.0.0-KDE1ZDg5NGVhYWVmM2EyOWUxNTQyODU2OWE1OGEzZDczNmFiY2MwZTEKFwi8uISpxAIQw_uEmQYY7zEgDDgGQPQHGgJsZiIgMDJmNDEwMmU5Y2UwYzg2M2ZhMWFjYzA4NWQ2ZjgyOGU; __ac_nonce=063213dc30086e87e9f12; _tea_utm_cache_2018=undefined; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAADqbkjqzPjd0agTxgKjm0TafDWhI3cP2aTW99Ntl2v5k%2F1663171200000%2F0%2F1663122897412%2F0%22; csrf_session_id=f6c673ff18a7aa29e21ac493d81b5de4; msToken=gSzT1_IfyWG233GPdPs69EI_DmTQuZ6gwN3NRYi5924lbFPQqnuZ_Y_MC8ENXyFC8LXTvJ4Tf8NF0VEc1dVkSGbTakfLKh1_MzTSp4ArKhtOCcKq9lbcFg==; tt_scid=DRfSmmEwZ0Oog98TL5eTSKf2PcN7qVgjZOeVqsV2vb.sabF8tLri9FOOFI4Qo9khabc0; home_can_add_dy_2_desktop=%221%22; msToken=3Zt_DDzdPHxchBbzuJLQ5foOAO954pyLHjwcOyVm4WBr25jzeEExW5guhoy4wQLWkHVXF9WdJWn821oEHdYugYRuEVLoe2ugOW3ONdRea6gA2d_GQub5Fw==; download_guide=%221%2F20220914%22";

const req = async () => {
  return new Promise((resolve, reject) => {
    const data = [];
    let size = 0;
    const request = net.request({
      url,
    });
    request.setHeader("cookie", cookie);
    request.setHeader(
      "user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
    );
    request.on("response", (response) => {
      response.on("data", (chunk) => {
        data.push(chunk);
        size += chunk.length;
      });
      response.on("end", () => {
        const value = Buffer.concat(data, size).toString("utf-8");
        const title = /<title data-react-helmet="true">(.*?) - 抖音</gi.exec(
          value
        )[1];
        const htmlData: {
          "32": {
            aweme: { detail: { video: { playAddr: Array<{ src: string }> } } };
          };
        } = JSON.parse(
          decodeURIComponent(
            /<script id="RENDER_DATA" type="application\/json">(.*?)<\/script>/gi.exec(
              value
            )[1]
          )
        );
        const src =
          "https:" + htmlData?.[32]?.aweme?.detail?.video?.playAddr?.[0]?.src;
        resolve({
          title,
          src,
        });
      });
    });
    request.end();
  });
};

const reqAll = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.douyin.com/user/MS4wLjABAAAAshurg6jJDz_utAtWyvfZVVkDQ_EvxYcnoRK_3iUcNDE?relation=0&vid=7143028940628708623"
  );
  const aList = await page.$$("li > a");
  const srcList = await Promise.all(
    aList.map(async (a) => a.getProperty("href"))
  );
  console.log(srcList);
};
export { reqAll };
