export default {
  getToken() {
    return window.localStorage.getItem("meedu-admin-token");
  },
  saveToken(token) {
    window.localStorage.setItem("meedu-admin-token", token);
  },
  clearToken() {
    window.localStorage.removeItem("meedu-admin-token");
  },
  saveEditorKey(key) {
    window.localStorage.setItem("meedu-editor-key", key);
  },
  getEditorKey() {
    return window.localStorage.getItem("meedu-editor-key");
  },
  exportExcel(data, filename, sheetName, wscols) {
    const XLSX = require("xlsx");
    const { write } = require("xlsx-style");
    const FileSaver = require("file-saver");
    // 表头样式
    let style = {
      // 表头样式
      hs: {
        font: { sz: 10, color: { rgb: "ffffff" }, bold: true },
        alignment: { horizontal: "center", vertical: "center", wrapText: true },
        fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "0064B2" } },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      },
    };
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(data);
    if (wscols) {
      ws["!cols"] = wscols;
    }
    for (let [key, value] of Object.entries(ws)) {
      if (key.startsWith("!")) continue;
      value.s = {
        alignment: { vertical: "center", horizontal: "center" },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      };
      if (parseInt(key.replace(/[^0-9]/gi, "")) === 1) {
        value.s = style.hs;
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    let wopts = { bookType: "xlsx", bookSST: false, type: "binary" };
    let wbout = write(wb, wopts);
    function s2ab(s) {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    // XLSX.writeFile(wb, filename);

    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: "" }), filename);
  },
  importExcel(data, filename, sheetName, wscols) {
    const XLSX = require("xlsx");
    const { write } = require("xlsx-style");
    const FileSaver = require("file-saver");
    // 表头样式
    let style = {
      // 表头样式
      hs: {
        font: { sz: 10, color: { rgb: "ffffff" }, bold: true },
        alignment: { horizontal: "center", vertical: "center", wrapText: true },
        fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "0064B2" } },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      },
    };
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(data);
    if (wscols) {
      ws["!cols"] = wscols;
    }
    for (let [key, value] of Object.entries(ws)) {
      if (key.startsWith("!")) continue;
      value.s = {
        alignment: { vertical: "center", horizontal: "center" },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      };
      if (parseInt(key.replace(/[^0-9]/gi, "")) === 1) {
        value.s = style.hs;
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    let wopts = { bookType: "xlsx", bookSST: false, type: "binary" };
    let wbout = write(wb, wopts);
    function s2ab(s) {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    // XLSX.writeFile(wb, filename);

    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: "" }), filename);
  },
  wechatUrlRules(url) {
    if (
      !url.substring(0, 8).match("https://") &&
      !url.substring(0, 7).match("http://")
    ) {
      return "地址必须携带http://或https://协议";
    }
  },
  currentDate() {
    const Manba = require("manba");
    return Manba().format("YYYY/MM/DD h:mm:ss");
  },
  getHMS(time) {
    const hour =
      parseInt(time / 3600) < 10
        ? "0" + parseInt(time / 3600)
        : parseInt(time / 3600);
    const min =
      parseInt((time % 3600) / 60) < 10
        ? "0" + parseInt((time % 3600) / 60)
        : parseInt((time % 3600) / 60);
    const sec =
      parseInt((time % 3600) % 60) < 10
        ? "0" + parseInt((time % 3600) % 60)
        : parseInt((time % 3600) % 60);
    return hour + ":" + min + ":" + sec;
  },
  scrollTopRecord(page) {
    let pos = document.querySelector(".page-main-body-box").scrollTop;
    if (pos > 0) {
      window.localStorage.setItem(`meedu-st-${page}`, pos);
    }
  },
  scrollTopSet(page) {
    let saveKey = `meedu-st-${page}`;
    let pos = window.localStorage.getItem(saveKey);
    if (pos) {
      document.querySelector(".page-main-body-box").scrollTop = pos;
      window.localStorage.removeItem(saveKey);
    }
  },
  copyright() {
    var outs = [],
      fi = function () {
        return {
          msg: "",
          style: "",
        };
      };

    var oi = fi();
    oi.msg = "MeEdu - 在线教育培训解决方案";
    oi.style =
      "padding-top: 15px;padding-bottom:15px;line-height:30px;font-size:1.8rem;color:#3ca7fa";
    outs.push(oi);

    oi = fi();
    oi.msg =
      "\r\n官网：\nhttp://106.13.204.114/\r\n\r\nGitHub：\nhttp://106.13.204.114/\r\n\r\n使用手册：\nhttps://www.yuque.com/meedu/fvvkbf\r\n";
    outs.push(oi);

    outs.map(function (x) {
      console.log("%c" + x.msg, x.style);
    });
  },
  getUrl() {
    return (
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname
    );
  },
  passwordRules(value) {
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,25}$/;
    let result = re.test(value);
    if (!result) {
      return "密码至少包含大写字母，小写字母，数字，且不少于12位";
    }
  },
};
