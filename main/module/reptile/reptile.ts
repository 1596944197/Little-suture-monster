import { net } from "electron";

const url = "https://www.douyin.com/video/7141326473436171551";

const req = async () => {
  return new Promise((resolve, reject) => {
    const data = [];
    let size = 0;
    const request = net.request({
      url,
    });
    request.setHeader(
      "cookie",
      "douyin.com; __ac_referer=https://www.douyin.com/video/7141326473436171551; ttwid=1%7CWOkU_7WQgcouL6T-bbFYKgb-usJlaQ1YcYNPwP2xapo%7C1662863649%7Cb0caea7db42bfe94593f8e372d195d492848165756c57f33e8c80bf244885f77; ttcid=8492571f859a4648884c8358e59a375033; passport_csrf_token=767bb983d247eb98673cc8753e07e56d; passport_csrf_token_default=767bb983d247eb98673cc8753e07e56d; s_v_web_id=verify_l7wq3wmu_9xNcYYmC_lzEe_4puQ_8Pjx_WRywoMZQnByi; n_mh=MUMSnAPppd4UE4O9BEspY8bGd5QelvNwp3SUVxpy1HQ; sso_uid_tt=6f0c489d6f71d06e414ad450b77f9013; sso_uid_tt_ss=6f0c489d6f71d06e414ad450b77f9013; toutiao_sso_user=db465ef17d4c133c4248ebbe035a0006; toutiao_sso_user_ss=db465ef17d4c133c4248ebbe035a0006; _tea_utm_cache_2018=undefined; download_guide=%223%2F20220911%22; FOLLOW_NUMBER_YELLOW_POINT_INFO=%22MS4wLjABAAAADqbkjqzPjd0agTxgKjm0TafDWhI3cP2aTW99Ntl2v5k%2F1662912000000%2F1662883008419%2F1662883007723%2F0%22; VIDEO_FILTER_MEMO_SELECT=%7B%22expireTime%22%3A1663488527099%2C%22type%22%3A0%7D; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAADqbkjqzPjd0agTxgKjm0TafDWhI3cP2aTW99Ntl2v5k%2F1662912000000%2F0%2F1662883727577%2F0%22; sid_ucp_sso_v1=1.0.0-KDFjZDBhNTdjNzBiNmQ1ZmRkMjA5MmEzODg0Yzg5M2VhOTE1ODgyMmYKHQi8uISpxAIQva_2mAYY7zEgDDDd_YvTBTgGQPQHGgJobCIgZGI0NjVlZjE3ZDRjMTMzYzQyNDhlYmJlMDM1YTAwMDY; ssid_ucp_sso_v1=1.0.0-KDFjZDBhNTdjNzBiNmQ1ZmRkMjA5MmEzODg0Yzg5M2VhOTE1ODgyMmYKHQi8uISpxAIQva_2mAYY7zEgDDDd_YvTBTgGQPQHGgJobCIgZGI0NjVlZjE3ZDRjMTMzYzQyNDhlYmJlMDM1YTAwMDY; passport_auth_status=30a367734d482a55e46c02ac6da8d8b5%2Ca30711cf4b1fedce8d3be934700a3e39; passport_auth_status_ss=30a367734d482a55e46c02ac6da8d8b5%2Ca30711cf4b1fedce8d3be934700a3e39; uid_tt=85939d063a17ba819f28da30fee3d8b9; uid_tt_ss=85939d063a17ba819f28da30fee3d8b9; sid_tt=ccc987451e40185aba2fafeb80f5ef5f; sessionid=ccc987451e40185aba2fafeb80f5ef5f; sessionid_ss=ccc987451e40185aba2fafeb80f5ef5f; __ac_signature=_02B4Z6wo00f01sHE-5QAAIDDH7KjMtdplQbB5P8AANN5n0GqAzMO34fEaz2KG-OBZSNGdqQen14C8HL8qOBpUX6YAjYLLJzPJ4C5RYcsXsN0-XSTYUFVmKT-xMf6vT2shHEP-R-M4MteNC2-b0; strategyABtestKey=1662957640.474; sid_guard=ccc987451e40185aba2fafeb80f5ef5f%7C1662957645%7C5110128%7CThu%2C+10-Nov-2022+08%3A09%3A33+GMT; sid_ucp_v1=1.0.0-KDhiYjdkNjExYmUwYjQ2NmE2YjU5MTBlNzE3MGRiY2Y1ZDRkYjNmY2YKFwi8uISpxAIQzfD6mAYY7zEgDDgGQPQHGgJscSIgY2NjOTg3NDUxZTQwMTg1YWJhMmZhZmViODBmNWVmNWY; ssid_ucp_v1=1.0.0-KDhiYjdkNjExYmUwYjQ2NmE2YjU5MTBlNzE3MGRiY2Y1ZDRkYjNmY2YKFwi8uISpxAIQzfD6mAYY7zEgDDgGQPQHGgJscSIgY2NjOTg3NDUxZTQwMTg1YWJhMmZhZmViODBmNWVmNWY; msToken=9ipPk8o9ZXhR5OnnytDg5Ony9ccQ-JUhISX2NtM3REKFVI3hm5U0Mg3Z4cThw3Vk-pvintZhF4WuRxaLLiBQbP60JSVifRABSFMPJUlTrnlhfLHMIrn9FjlhnNrE145gag==; home_can_add_dy_2_desktop=%221%22; tt_scid=DcLsAENYoh6h-JRZmuHSP.fBrW0yj1frsaA-LNY7HJn9CXhf0oNMwL51WX0Jsh4k2a57; msToken=ffPlJJVbEbjWpHqR3OglzBjlZLG-o2cj1qSlnOE_AhsqKtS5c2n9E3ElvOnr4T5-AYjTmxwjcj04KDLRjDHso45HOVhhG2ePFPmxqjV2MfXS6A9wfqXmQAtk_KIXuRNw; __ac_nonce=0631ef2d80089f41279bf; odin_tt=cbc2d17d7c915415f7e55d3a8dc8091428926feb2ec3bc41a8fd8b40025cb80966c0e86d52ba105f7f2e1841b87952bd; passport_fe_beating_status=false"
    );
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

const reqAll = async () => {};
export { reqAll };
