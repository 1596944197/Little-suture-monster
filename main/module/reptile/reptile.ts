import { app, net } from "electron";
import { writeFileSync } from "fs";
import puppeteer from "puppeteer";

const cookie =
  "douyin.com; ttwid=1%7CO4m60a5HNDqSES-DKLSRBsv9oBz45D7kRr20-LCeNXI%7C1663122854%7C094c7f9d8eb7e4f0c400c24af3b4f718f2eea679337037c3a3691f3310075df0; douyin.com; strategyABtestKey=1663122856.406; s_v_web_id=verify_l810epi9_FMFsfrRa_AeI7_4ZaU_8Lta_0qfPCOMAoBn5; passport_csrf_token=98638e7a6cff09ef45c237e5646bd2ac; passport_csrf_token_default=98638e7a6cff09ef45c237e5646bd2ac; ttcid=f208e31d5bd543d5914a25e0848df7cb26; n_mh=MUMSnAPppd4UE4O9BEspY8bGd5QelvNwp3SUVxpy1HQ; sso_uid_tt=cb156e2df1cc93aafeecac6c5c79e383; sso_uid_tt_ss=cb156e2df1cc93aafeecac6c5c79e383; toutiao_sso_user=f6cced66219762a8462a01de0c186946; toutiao_sso_user_ss=f6cced66219762a8462a01de0c186946; sid_ucp_sso_v1=1.0.0-KGMxOGU5OWFkNWIwNjM4NmEwMDdlOTk2NjkyNzhkMTU1NTYwY2Q2N2MKHQi8uISpxAIQw_uEmQYY7zEgDDDd_YvTBTgGQPQHGgJsZiIgZjZjY2VkNjYyMTk3NjJhODQ2MmEwMWRlMGMxODY5NDY; ssid_ucp_sso_v1=1.0.0-KGMxOGU5OWFkNWIwNjM4NmEwMDdlOTk2NjkyNzhkMTU1NTYwY2Q2N2MKHQi8uISpxAIQw_uEmQYY7zEgDDDd_YvTBTgGQPQHGgJsZiIgZjZjY2VkNjYyMTk3NjJhODQ2MmEwMWRlMGMxODY5NDY; odin_tt=fc3ffeb9865d738343fa60a9c802934d57190ff3ffafb5a5e4679a1b349311a567611b62dfd18ba43c340a53b6c80cf0; passport_auth_status=f366e086e23886fc848ac7cfffd8f76d%2C; passport_auth_status_ss=f366e086e23886fc848ac7cfffd8f76d%2C; sid_guard=02f4102e9ce0c863fa1acc085d6f828e%7C1663122883%7C5184000%7CSun%2C+13-Nov-2022+02%3A34%3A43+GMT; uid_tt=fea01547c0e251cf1f245aef77cba69d; uid_tt_ss=fea01547c0e251cf1f245aef77cba69d; sid_tt=02f4102e9ce0c863fa1acc085d6f828e; sessionid=02f4102e9ce0c863fa1acc085d6f828e; sessionid_ss=02f4102e9ce0c863fa1acc085d6f828e; sid_ucp_v1=1.0.0-KDE1ZDg5NGVhYWVmM2EyOWUxNTQyODU2OWE1OGEzZDczNmFiY2MwZTEKFwi8uISpxAIQw_uEmQYY7zEgDDgGQPQHGgJsZiIgMDJmNDEwMmU5Y2UwYzg2M2ZhMWFjYzA4NWQ2ZjgyOGU; ssid_ucp_v1=1.0.0-KDE1ZDg5NGVhYWVmM2EyOWUxNTQyODU2OWE1OGEzZDczNmFiY2MwZTEKFwi8uISpxAIQw_uEmQYY7zEgDDgGQPQHGgJsZiIgMDJmNDEwMmU5Y2UwYzg2M2ZhMWFjYzA4NWQ2ZjgyOGU; _tea_utm_cache_2018=undefined; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAADqbkjqzPjd0agTxgKjm0TafDWhI3cP2aTW99Ntl2v5k%2F1663171200000%2F0%2F1663122897412%2F0%22; csrf_session_id=f6c673ff18a7aa29e21ac493d81b5de4; download_guide=%223%2F20220914%22; __ac_nonce=0632195dc002d731598c3; __ac_signature=_02B4Z6wo00f01CopbTgAAIDAk2MHbLXVoNgqCWmAAGmyEZaJ-oxMjzNLhWjkhPw1aeS8bwYVNfZm.rEgsHSUhtzY5Xavyb3NQeiymtbhYqa3L7XoVyXt0wwRT1eiofT1rmaDAU6I1PG6WYpT4d; msToken=FcKO6brWV4W8QRXTRJZvTsNBKcHf88SdhtC1hBPMWl3mR1Ks1RVL4zyXxRx6i1a1GuWom0iFpC9OswNzL42YDSMy1kINgD0r0UNrqFciOcX2CGwIZIloRA==; msToken=p4-l_sPNadvi-9_744YG-r4SbpaHLI-Dmbo82jRFWPvAH4Zsh_GoEgnu5CB0Ikec5kyMPADyE8TT1uIjOU6Y8cKLBS-J9p3QiVkqQ10hgKn4xfPSC0iF7puK-3dYvFc=; home_can_add_dy_2_desktop=%221%22; tt_scid=Dh1NFrGmh5cXG5OjxjoU6u9T4ARQ85njKHalabdIjom9AJhu9mPKVtPTVWjLandT576c";

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36";

const pageSrc =
  "https://www.douyin.com/user/MS4wLjABAAAAD85QUmU0f-EPzuCuxChH_vsfO06N-YL5v9NrOuFY8TE?relation=1&vid=7141326473436171551";

const reqSingle = async (url: string): Promise<{ title; src }> => {
  return new Promise((resolve, reject) => {
    const data = [];
    let size = 0;
    const request = net.request({
      url,
    });
    request.setHeader("cookie", cookie);
    request.setHeader("user-agent", userAgent);
    request.on("response", (response) => {
      response.on("data", (chunk) => {
        data.push(chunk);
        size += chunk.length;
      });
      response.on("end", () => {
        const value = Buffer.concat(data, size).toString("utf-8");
        const title = /<title data-react-helmet="true">(.*?) - 抖音</gi.exec(
          value
        )?.[1];
        if (!title) {
          reject(new Error("验证失败"));
          return;
        }
        const htmlData: {
          "32": {
            aweme: { detail: { video: { playAddr: Array<{ src: string }> } } };
          };
        } = JSON.parse(
          decodeURIComponent(
            /<script id="RENDER_DATA" type="application\/json">(.*?)<\/script>/gi.exec(
              value
            )?.[1]
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

const write = async (title: string, url: string) => {
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
      // # 此处不能使用toString('utf8'),会导致下载的视频无法打开
      const value = Buffer.concat(data, size);
      writeFileSync(`./resources/video/${title}.mp4`, value);
    });
  });
  request.end();
};

const reqAll = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(pageSrc);

  const aList = await page.$$("li > a");
  const srcPromiseList = await Promise.all(
    aList.map(async (a) => a.getProperty("href"))
  );
  const srcList = srcPromiseList.map((item) =>
    item.toString().replace("JSHandle:", "")
  );

  srcList.forEach((s, i) => {
    setTimeout(async () => {
      const { title, src } = await reqSingle(s);
      write(title, src);
      if (i === srcList.length - 1) app.quit();
    }, i * 1000);
  });
};
export { reqAll };
