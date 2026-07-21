const REGIONS = {
  asia: { name: '亞洲', icon: '亞', subtitle: '帝國擴張、民族國家與冷戰前線' },
  europe: { name: '歐洲', icon: '歐', subtitle: '法西斯崛起、全面戰爭與重建分裂' },
  americas: { name: '美洲', icon: '美', subtitle: '孤立主義、戰時動員與全球領導' }
};

const EVENTS = [
  {id:'a1935',region:'asia',year:1935,date:'1935',type:'person',title:'中國國民政府的十年建設',summary:'南京國民政府持續推動交通、金融與行政整合，但國共對峙與日本壓力同步升高。',leaders:['蔣中正','汪精衛'],context:'國民政府試圖建立中央集權與現代財政體系，卻必須同時處理內戰、地方勢力與日本在華北的擴張。',impact:'觀察焦點：國家建設為何常與戰爭準備同時發生？',source:'https://history.state.gov/milestones/1937-1945/chinese-rev'},
  {id:'a1937',region:'asia',year:1937,date:'1937.07',type:'event',title:'中日戰爭全面化',summary:'盧溝橋事變後，戰事由華北迅速擴大，中國進入長期全面抗戰。',leaders:['蔣中正','近衛文麿'],context:'日本追求東亞霸權與資源安全；中國政府則以「以空間換時間」維持抵抗，人口、工業與政府機構大量向內地遷移。',impact:'全球意義：亞洲戰場早於歐洲全面戰爭兩年展開。',source:'https://history.state.gov/milestones/1937-1945/foreword'},
  {id:'a1940',region:'asia',year:1940,date:'1940.09',type:'economy',title:'日本提出「大東亞共榮圈」',summary:'日本以區域合作之名建構由其主導的政治與經濟秩序。',leaders:['近衛文麿'],context:'口號強調亞洲自主，實際運作則服務於帝國軍事、原料取得與殖民統治，並加深與美英荷等國的經濟衝突。',impact:'政經焦點：資源封鎖與帝國擴張如何推動戰爭升級？',source:'https://history.state.gov/milestones/1937-1945/pearl-harbor'},
  {id:'a1941',region:'asia',year:1941,date:'1941.12.07',type:'event',title:'珍珠港與太平洋戰爭',summary:'日本突襲珍珠港，美國正式參戰，歐亞兩大戰場被更緊密地連結。',leaders:['東條英機','富蘭克林・羅斯福'],context:'石油禁運、戰略誤判與日本南進政策共同促成衝突。日本初期快速占領東南亞與西太平洋多地。',impact:'世界轉折：美國由支援盟國轉為全面參戰。',source:'https://history.state.gov/milestones/1937-1945/pearl-harbor'},
  {id:'a1945',region:'asia',year:1945,date:'1945.08–09',type:'event',title:'日本投降，亞洲戰爭結束',summary:'原子彈投下、蘇聯對日參戰及長期戰爭消耗後，日本宣布投降。',leaders:['昭和天皇','杜魯門','史達林'],context:'殖民帝國瓦解、占領治理與戰後責任成為核心議題；中國內戰也很快重新升高。',impact:'戰爭結束不是問題終點，而是去殖民化與冷戰競爭的起點。',source:'https://encyclopedia.ushmm.org/content/en/article/world-war-ii-key-dates?series=7'},
  {id:'a1947',region:'asia',year:1947,date:'1947.08',type:'event',title:'印度與巴基斯坦分治獨立',summary:'英屬印度終結，但宗教與邊界分治引發大規模遷徙與暴力。',leaders:['賈瓦哈拉爾・尼赫魯','穆罕默德・阿里・真納','路易斯・蒙巴頓'],context:'二戰削弱歐洲殖民國力，也放大民族自決訴求；獨立同時伴隨國家邊界、少數族群與難民危機。',impact:'去殖民化顯示「獨立」與「和平」並不必然同步。',source:'https://history.state.gov/milestones/1945-1952/asia-and-africa'},
  {id:'a1949',region:'asia',year:1949,date:'1949.10.01',type:'leader',title:'中華人民共和國成立',summary:'中國共產黨在內戰中取得大陸政權，中華民國政府遷臺。',leaders:['毛澤東','蔣中正'],context:'土地、農村動員、戰後通膨與政權正當性等因素交織；東亞權力平衡因此重組。',impact:'冷戰焦點由歐洲進一步移向亞洲。',source:'https://history.state.gov/milestones/1945-1952/chinese-rev'},
  {id:'a1950',region:'asia',year:1950,date:'1950.06',type:'event',title:'韓戰爆發',summary:'北韓越過三八線，聯合國軍、中國人民志願軍等先後介入。',leaders:['金日成','杜魯門','毛澤東'],context:'朝鮮半島的分區占領轉化為代理戰爭，也促使美國強化日本、臺灣與西太平洋的安全布局。',impact:'冷戰由政治對峙轉為高強度熱戰。',source:'https://history.state.gov/milestones/1945-1952/korean-war-2'},
  {id:'a1954',region:'asia',year:1954,date:'1954',type:'economy',title:'日內瓦會議與東南亞安全重組',summary:'法國在印度支那的殖民戰爭告終，越南暫時分治；SEATO 隨後成立。',leaders:['周恩來','胡志明','德懷特・艾森豪'],context:'民族解放、殖民撤退與反共圍堵交錯，使東南亞成為下一階段冷戰競爭中心。',impact:'制度焦點：軍事同盟是否能真正穩定區域？',source:'https://history.state.gov/milestones/1953-1960/seato'},

  {id:'e1935',region:'europe',year:1935,date:'1935.09',type:'event',title:'紐倫堡法',summary:'納粹政權以法律剝奪德國猶太人的公民權，制度化種族迫害。',leaders:['阿道夫・希特勒'],context:'威權統治不只靠暴力，也利用立法、官僚與宣傳，把排除與歧視轉化為國家制度。',impact:'理解焦點：法律形式並不保證法律內容正義。',source:'https://encyclopedia.ushmm.org/content/en/article/nuremberg-laws'},
  {id:'e1936',region:'europe',year:1936,date:'1936–1939',type:'event',title:'西班牙內戰',summary:'共和派與國民軍交戰，德義與蘇聯介入，成為歐洲全面戰爭的預演。',leaders:['佛朗哥','曼努埃爾・阿薩尼亞'],context:'法西斯、共產主義、自由民主與無政府主義等力量交錯；空襲平民與外國志願軍成為戰爭特徵。',impact:'內戰如何被國際意識形態競爭放大？',source:'https://www.britannica.com/event/Spanish-Civil-War'},
  {id:'e1938',region:'europe',year:1938,date:'1938.09',type:'person',title:'慕尼黑協定與綏靖政策',summary:'英法同意德國取得蘇台德區，希望以讓步避免戰爭。',leaders:['內維爾・張伯倫','阿道夫・希特勒','愛德華・達拉第'],context:'第一次世界大戰創傷、軍備不足與反戰民意影響決策；但讓步也削弱捷克斯洛伐克並鼓勵納粹進一步擴張。',impact:'外交難題：妥協何時是和平策略，何時成為縱容？',source:'https://encyclopedia.ushmm.org/content/en/article/munich-agreement'},
  {id:'e1939',region:'europe',year:1939,date:'1939.09.01',type:'event',title:'德國入侵波蘭',summary:'英法對德宣戰，第二次世界大戰在歐洲正式爆發。',leaders:['阿道夫・希特勒','史達林'],context:'德蘇互不侵犯條約的秘密議定書劃分東歐勢力範圍，使波蘭同時遭德蘇入侵。',impact:'國際秩序崩解：安全承諾終於轉化為全面戰爭。',source:'https://encyclopedia.ushmm.org/content/en/article/world-war-ii-key-dates?series=7'},
  {id:'e1940',region:'europe',year:1940,date:'1940.05–06',type:'event',title:'法國陷落與不列顛空戰',summary:'德軍迅速擊敗法國；英國在空戰中抵抗德國，避免本土遭入侵。',leaders:['溫斯頓・邱吉爾','阿道夫・希特勒','夏爾・戴高樂'],context:'機械化部隊、空軍協同與指揮效率改變戰爭節奏；英國則藉雷達、工業與帝國資源維持防線。',impact:'科技、工業能力與政治意志共同決定戰局。',source:'https://encyclopedia.ushmm.org/content/en/article/world-war-ii-key-dates?series=7'},
  {id:'e1941',region:'europe',year:1941,date:'1941.06',type:'event',title:'德國入侵蘇聯',summary:'巴巴羅薩行動開啟規模巨大的東線戰爭，也使納粹種族滅絕政策急速升級。',leaders:['阿道夫・希特勒','史達林'],context:'戰爭目標包含領土、資源與種族殖民；東線因此同時是軍事戰場與大規模迫害現場。',impact:'戰爭與種族政策在東線高度融合。',source:'https://encyclopedia.ushmm.org/content/en/article/invasion-of-the-soviet-union-june-1941'},
  {id:'e1944',region:'europe',year:1944,date:'1944.06.06',type:'event',title:'諾曼第登陸',summary:'盟軍在法國建立西線橋頭堡，納粹德國面臨東西夾擊。',leaders:['德懷特・艾森豪','溫斯頓・邱吉爾','富蘭克林・羅斯福'],context:'跨國聯合作戰需要龐大後勤、制空權、情報欺敵與工業生產能力。',impact:'同盟協調與物資優勢開始轉化為決定性戰果。',source:'https://encyclopedia.ushmm.org/content/en/article/d-day'},
  {id:'e1945',region:'europe',year:1945,date:'1945.05',type:'event',title:'德國投降與歐洲戰爭終結',summary:'柏林陷落，納粹政權崩潰；歐洲進入占領、審判與重建。',leaders:['史達林','邱吉爾','杜魯門'],context:'戰後安排包括德國分區占領、邊界調整、難民安置與戰犯審判；盟國合作很快轉化為美蘇競爭。',impact:'勝利之後的核心問題變成：誰來定義新秩序？',source:'https://encyclopedia.ushmm.org/content/en/article/world-war-ii-key-dates?series=7'},
  {id:'e1947',region:'europe',year:1947,date:'1947',type:'economy',title:'杜魯門主義與馬歇爾計畫',summary:'美國以安全援助和經濟重建支持西歐，圍堵蘇聯影響力。',leaders:['哈瑞・杜魯門','喬治・馬歇爾','史達林'],context:'重建不只是人道問題，也關係市場恢復、政治穩定與意識形態競爭。',impact:'經濟援助成為冷戰外交的重要工具。',source:'https://history.state.gov/milestones/1945-1952/marshall-plan'},
  {id:'e1949',region:'europe',year:1949,date:'1949',type:'leader',title:'北約成立與德國分裂',summary:'西方國家建立北約；德意志聯邦共和國與德意志民主共和國先後成立。',leaders:['哈瑞・杜魯門','康拉德・艾德諾','史達林'],context:'柏林封鎖與空運加深陣營對立，歐洲的軍事安全與國家重建被納入兩極體系。',impact:'「鐵幕」由政治語言變成制度與邊界。',source:'https://history.state.gov/milestones/1945-1952/nato'},
  {id:'e1955',region:'europe',year:1955,date:'1955',type:'economy',title:'華沙公約與兩大軍事集團',summary:'西德加入北約後，蘇聯與東歐盟國成立華沙公約。',leaders:['尼基塔・赫魯雪夫','康拉德・艾德諾'],context:'歐洲安全架構被正式分為兩大陣營，核武嚇阻與常規軍備競賽同步加劇。',impact:'戰後十年，歐洲由世界戰場轉為冷戰前線。',source:'https://www.nato.int/cps/en/natohq/declassified_138294.htm'},

  {id:'m1935',region:'americas',year:1935,date:'1935',type:'economy',title:'新政進入第二階段',summary:'美國擴大社會保障、勞工權利與公共建設，回應經濟大蕭條。',leaders:['富蘭克林・羅斯福'],context:'聯邦政府角色顯著擴張；新政改善部分社會困境，但真正的大規模工業復甦也與戰時動員密切相關。',impact:'政經焦點：危機是否會永久改變政府與市場的界線？',source:'https://www.archives.gov/milestone-documents/social-security-act'},
  {id:'m1937',region:'americas',year:1937,date:'1937',type:'leader',title:'孤立主義與「隔離演說」',summary:'美國社會仍普遍反對捲入海外戰爭，羅斯福則逐漸主張對侵略採取集體回應。',leaders:['富蘭克林・羅斯福'],context:'中立法反映一次大戰後的反戰情緒，但亞洲與歐洲危機迫使美國重新思考安全與貿易利益。',impact:'國內民意如何限制外交領導？',source:'https://history.state.gov/milestones/1937-1945/american-isolationism'},
  {id:'m1941',region:'americas',year:1941,date:'1941',type:'economy',title:'租借法案與「民主兵工廠」',summary:'美國向盟國提供軍需物資，並在正式參戰前加速戰時工業轉型。',leaders:['富蘭克林・羅斯福'],context:'政府訂單、量產技術與勞動力重組使美國成為盟軍主要供應者，也為戰後經濟優勢奠基。',impact:'工業產能可被視為一種戰略武器。',source:'https://history.state.gov/milestones/1937-1945/lend-lease'},
  {id:'m1942',region:'americas',year:1942,date:'1942',type:'economy',title:'全面戰時動員',summary:'徵兵、配給、軍工生產與女性就業快速擴張，美國社會結構被戰爭重塑。',leaders:['富蘭克林・羅斯福'],context:'戰時繁榮降低失業，但日裔美國人強制拘禁等政策也暴露民主社會在安全焦慮下的人權危機。',impact:'民主國家在戰爭中如何平衡自由與安全？',source:'https://www.archives.gov/education/lessons/japanese-relocation'},
  {id:'m1944',region:'americas',year:1944,date:'1944.07',type:'economy',title:'布列敦森林體系',summary:'盟國規劃戰後貨幣與金融秩序，建立 IMF 與世界銀行的制度基礎。',leaders:['富蘭克林・羅斯福','亨利・摩根索'],context:'美元與固定匯率安排反映美國經濟實力，也試圖避免戰間期競爭性貶值與貿易壁壘重演。',impact:'戰後秩序不只由軍事勝負決定，也由金融規則塑造。',source:'https://history.state.gov/milestones/1937-1945/bretton-woods'},
  {id:'m1945',region:'americas',year:1945,date:'1945',type:'person',title:'羅斯福逝世，杜魯門接任',summary:'杜魯門在戰爭最後階段接掌總統職務，面對原子彈、戰後安排與蘇聯關係。',leaders:['哈瑞・杜魯門','富蘭克林・羅斯福'],context:'美國從戰時同盟核心轉向戰後超級強權；總統更替也使決策風格與資訊掌握出現急遽轉換。',impact:'領導人更替如何影響重大歷史決策？',source:'https://history.state.gov/milestones/1937-1945/potsdam-conf'},
  {id:'m1945un',region:'americas',year:1945,date:'1945.10.24',type:'event',title:'聯合國正式成立',summary:'《聯合國憲章》生效，國際合作制度在戰爭廢墟中重新建立。',leaders:['哈瑞・杜魯門','各創始會員國代表'],context:'舊金山會議集結 50 國代表；安全理事會常任理事國安排也反映大國權力現實。',impact:'理想與權力：集體安全制度如何兼顧國家平等與大國責任？',source:'https://www.un.org/en/about-us/history-of-the-un'},
  {id:'m1947',region:'americas',year:1947,date:'1947',type:'event',title:'美洲國家間互助條約',summary:'里約條約建立西半球集體防衛框架，美國把冷戰安全邏輯延伸到拉丁美洲。',leaders:['哈瑞・杜魯門'],context:'反共、安全合作與美國區域主導交織；拉丁美洲各國則在現代化、民主與軍事政治間拉扯。',impact:'區域安全合作也可能鞏固權力不對等。',source:'https://history.state.gov/milestones/1945-1952/rio-pact'},
  {id:'m1948',region:'americas',year:1948,date:'1948',type:'leader',title:'美洲國家組織成立',summary:'美洲國家組織（OAS）在波哥大成立，制度化區域外交與合作。',leaders:['美洲各國政府代表'],context:'組織承接泛美體系，但也長期面對美國影響力、主權原則與民主治理之間的張力。',impact:'區域組織能否同時維持合作與成員自主？',source:'https://www.oas.org/en/about/who_we_are.asp'},
  {id:'m1950',region:'americas',year:1950,date:'1950',type:'economy',title:'韓戰帶動再軍備與國防經濟',summary:'美國大幅提高軍事支出，冷戰由有限援助轉向長期全球軍事部署。',leaders:['哈瑞・杜魯門'],context:'NSC-68 與韓戰強化「國家安全國家」體制，軍工產業、科技研發與聯盟支出持續擴張。',impact:'和平時期也可能形成永久性的戰時經濟結構。',source:'https://history.state.gov/milestones/1945-1952/NSC68'},
  {id:'m1954',region:'americas',year:1954,date:'1954',type:'event',title:'瓜地馬拉政變',summary:'美國支持推翻阿本斯政府，冷戰反共政策深刻介入拉丁美洲內政。',leaders:['德懷特・艾森豪','哈科沃・阿本斯'],context:'土地改革、跨國企業利益與反共安全觀相互交織，成為美國—拉美關係的重要爭議。',impact:'冷戰中的「安全」常與經濟利益及主權衝突相連。',source:'https://history.state.gov/milestones/1953-1960/guatemala'},
];

const QUESTIONS = {
  1935:'比較三洲：國家都在擴張政府能力，但目的與政治制度有何不同？',
  1937:'亞洲戰爭升高、美國仍偏孤立、歐洲內戰延燒：全球危機為何沒有立即形成共同回應？',
  1939:'歐洲全面戰爭爆發時，亞洲與美洲已各自累積哪些危機？',
  1941:'珍珠港如何把原本相對分離的亞洲、歐洲與美洲戰場連成一場世界戰爭？',
  1945:'二戰結束是否也代表全球衝突結束？請比較三洲在 1945 年之後面臨的新問題。',
  1947:'重建、去殖民化與冷戰圍堵同時發生，三者之間有什麼因果關係？',
  1949:'同一年出現北約、德國分裂與中國政權更替，冷戰為何開始全球化？',
  1950:'韓戰如何改變亞洲安全、歐洲軍事聯盟與美國經濟？',
  1954:'殖民戰爭、軍事同盟與秘密干預同時出現，這些做法真的帶來穩定嗎？'
};
