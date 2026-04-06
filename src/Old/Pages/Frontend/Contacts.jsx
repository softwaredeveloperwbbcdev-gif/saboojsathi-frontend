import React from "react";
import Navbar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import ContactBanner from "../../assets/images/Banners/Contact_banner.jpg";

function Contacts() {
  return (
    <>
      <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-slate-200">
        <Navbar />
        {/** Main Section */}
        <div>
          <div
            className="bg-cover bg-center bg-no-repeat w-full"
            style={{
              backgroundImage: `url(` + ContactBanner + `)`,
            }}
          >
            <div className="w-[1140px] mx-auto py-12">
              <h3 className="text-5xl text-white font-sans">Contact</h3>
            </div>
          </div>
          <div className="w-[1140px] mx-auto pt-12">
            <div className="border-b-2 border-b-green-600 pb-3">
              <h2 className="text-center text-4xl text-green-600">
                Nodal Officers
              </h2>
            </div>
            <div className="w-2/5 mx-auto text-center">
              <div>
                <h1 className="text-2xl">SPMU</h1>
              </div>
              <div className="w-full flex flex-row">
                <div className="w-1/2 my-2">
                  <h4 className="text-lg">Shri Partha Pratim Manna</h4>
                  <h5 className="text-sm">MD WBSCSTOBCDFC</h5>
                  <h6 className="text-xs">md[dot]scstdfc[at]gmail[dot]com</h6>
                </div>
                <div className="w-1/2 my-2">
                  <h4 className="text-lg">Shri Satyabrata Halder</h4>
                  <h5 className="text-sm">DM HQ WBSCSTOBCDFC</h5>
                  <h6 className="text-xs">dm[dot]scstdfc[at]gmail[dot]com</h6>
                </div>
              </div>
              <div>
                <h4 className="text-lg">033 - 40261534 / 40261535</h4>
              </div>
            </div>
            <table className="w-full border border-gray-400 mb-6">
              <thead>
                <tr className="bg-[#00a65a] text-white">
                  <th className="w-[4%] p-3">SL.</th>
                  <th className="w-[15%] p-3">DISTRICT</th>
                  <th className="w-[15%] p-3">NAME OF NODAL OFFICERS</th>
                  <th className="w-[13%] p-3">DESIGNATION</th>
                  <th className="w-[10%] p-3">CONTACT NUMBER</th>
                  <th className="w-[18%] p-3">E-MAIL ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400">1</td>
                  <td className="border border-gray-400">ALIPURDUAR</td>
                  <td className="border border-gray-400">
                    SMT SONAM DOMA BHUTIA
                  </td>
                  <td className="border border-gray-400">P.O. CUM D.W.O</td>
                  <td className="border border-gray-400">03564-253256</td>
                  <td className="border border-gray-400">
                    podwoapd2014@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">2</td>
                  <td className="border border-gray-400">BANKURA</td>
                  <td className="border border-gray-400">
                    GOURI SANKAR BHATTACHARYYA
                  </td>
                  <td className="border border-gray-400">
                    DIST. MANAGER,WB SC, ST &amp; OBC D&amp;FC
                  </td>

                  <td className="border border-gray-400">
                    03242-251047/241914
                  </td>
                  <td className="border border-gray-400">
                    dm.wbscstdfc.bankura@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">3</td>
                  <td className="border border-gray-400">PURBA BARDHAMAN</td>
                  <td className="border border-gray-400">
                    SMT MALABIKA KHATUA
                  </td>
                  <td className="border border-gray-400">
                    DIST. MANAGER,WB SC,ST &amp; OBC D&amp;FC
                  </td>

                  <td className="border border-gray-400">0342-2567706</td>
                  <td className="border border-gray-400">sctc.bdn@gmail.com</td>
                </tr>
                <tr>
                  <td className="border border-gray-400">4</td>
                  <td className="border border-gray-400">PASCHIM BURDWAN</td>
                  <td className="border border-gray-400">GOUTAM DATTA </td>
                  <td className="border border-gray-400">
                    DIST. MANAGER,WB SC, ST &amp; OBC D&amp;FC
                  </td>

                  <td className="border border-gray-400"></td>
                  <td className="border border-gray-400">
                    scstpmbdn@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">5</td>
                  <td className="border border-gray-400">BIRBHUM</td>
                  <td className="border border-gray-400">
                    SUDIPTA CHAKRABORTY
                  </td>
                  <td className="border border-gray-400">P.O. CUM D.W.O</td>
                  <td className="border border-gray-400">03462-255746</td>
                  <td className="border border-gray-400">
                    pobcwbirbhum@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">6</td>
                  <td className="border border-gray-400">COOCHBEHAR</td>
                  <td className="border border-gray-400">JAYANTA MONDAL</td>
                  <td className="border border-gray-400">D.W.O</td>
                  <td className="border border-gray-400">
                    03582-222614/ 231509
                  </td>
                  <td className="border border-gray-400">bcwcob@gmail.com</td>
                </tr>
                <tr>
                  <td className="border border-gray-400">7</td>
                  <td className="border border-gray-400">DAKSHIN DINAJPUR</td>
                  <td className="border border-gray-400">SUJOY SADHU</td>
                  <td className="border border-gray-400">
                    DIST.MANAGER,WB SC,ST&amp; OBC D&amp;FC
                  </td>
                  <td className="border border-gray-400">03522-255627</td>
                  <td className="border border-gray-400">
                    wbscstdfcdd@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">8</td>
                  <td className="border border-gray-400">HOWRAH</td>
                  <td className="border border-gray-400">SOUGATA MAITY</td>
                  <td className="border border-gray-400">
                    DIST.MANAGER,WB SC,ST&amp; OBC D&amp;FC
                  </td>

                  <td className="border border-gray-400">26415343</td>
                  <td className="border border-gray-400">
                    saboojsathihowrah@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">9</td>
                  <td className="border border-gray-400">HOOGHLY</td>
                  <td className="border border-gray-400">TAPAS BISWAS-IV</td>
                  <td className="border border-gray-400">P.O. CUM D.W.O</td>
                  <td className="border border-gray-400">26812659</td>
                  <td className="border border-gray-400">
                    pobcwhoog@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">10</td>
                  <td className="border border-gray-400">JALPAIGURI</td>
                  <td className="border border-gray-400">PARVIN LAMA</td>
                  <td className="border border-gray-400">P.O. CUM D.W.O</td>
                  <td className="border border-gray-400">03561-230069</td>
                  <td className="border border-gray-400">bcwdjal@gmail.com</td>
                </tr>
                <tr>
                  <td className="border border-gray-400">11</td>
                  <td className="border border-gray-400">MALDA</td>
                  <td className="border border-gray-400">SMT CHAITALI DATTA</td>
                  <td className="border border-gray-400">P.O. CUM D.W.O</td>
                  <td className="border border-gray-400">03512-221048</td>
                  <td className="border border-gray-400">
                    bcwmalda2@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">12</td>
                  <td className="border border-gray-400">MURSHIDABAD</td>
                  <td className="border border-gray-400">NITISH BALA</td>
                  <td className="border border-gray-400">
                    DIST. MANAGER, WB SC,ST &amp; OBC D&amp;FC
                  </td>

                  <td className="border border-gray-400">03482-251128</td>
                  <td className="border border-gray-400">
                    dmscstdfcmsd@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">13</td>
                  <td className="border border-gray-400">NADIA</td>
                  <td className="border border-gray-400">
                    SAILA SIKHAR SARKAR
                  </td>
                  <td className="border border-gray-400">
                    DIST. MANAGER, WB SC,ST &amp; OBC D&amp;FC.
                  </td>

                  <td className="border border-gray-400">03472-252567</td>
                  <td className="border border-gray-400">
                    bcwonadia@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">14</td>
                  <td className="border border-gray-400">NORTH 24 PARGANAS</td>
                  <td className="border border-gray-400">TARAK MANDAL</td>
                  <td className="border border-gray-400">
                    DIST. MANAGER,WBSC,ST&amp;OBCD&amp;FC
                  </td>

                  <td className="border border-gray-400">25523260/25842227</td>
                  <td className="border border-gray-400">
                    dmscst.n24p@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">15</td>
                  <td className="border border-gray-400">PASCHIM MEDINIPUR</td>
                  <td className="border border-gray-400">MANISH DAS</td>
                  <td className="border border-gray-400">P.O. CUM D.W.O</td>

                  <td className="border border-gray-400">03222-275899</td>
                  <td className="border border-gray-400">
                    pasmid.scstdfc@gmail.com
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-400">16</td>
                  <td className="border border-gray-400">JHARGRAM</td>
                  <td className="border border-gray-400">SANKHA SUBHRA DEY</td>
                  <td className="border border-gray-400">
                    DIST.MANAGER, WB SC,ST &amp; OBC D&amp;FC
                  </td>

                  <td className="border border-gray-400"></td>
                  <td className="border border-gray-400">
                    scstobcdfcjgm@gmail.com
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-400">17</td>
                  <td className="border border-gray-400">PURBA MEDINIPUR</td>
                  <td className="border border-gray-400">ANIRUDDHA NANDI</td>
                  <td className="border border-gray-400">D.W.O</td>

                  <td className="border border-gray-400">03228-263337</td>
                  <td className="border border-gray-400">
                    dwobcw.pumid@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">18</td>
                  <td className="border border-gray-400">PURULIA</td>
                  <td className="border border-gray-400">DEBARSHI NAG</td>
                  <td className="border border-gray-400">
                    DIST.MANAGER, WB SC, ST &amp;OBC D&amp;FC
                  </td>

                  <td className="border border-gray-400">03252-222901</td>
                  <td className="border border-gray-400">
                    districtmanagerpurulia@yahoo.in
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">19</td>
                  <td className="border border-gray-400">SILIGURI</td>
                  <td className="border border-gray-400">VIR VIKRAM RAI</td>
                  <td className="border border-gray-400">P.O. CUM D.W.O</td>

                  <td className="border border-gray-400">0353-2582003</td>
                  <td className="border border-gray-400">
                    slgpodwo1@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">20</td>
                  <td className="border border-gray-400">SOUTH 24 PARGANAS</td>
                  <td className="border border-gray-400">
                    PRASANTA KUMAR MAITY
                  </td>
                  <td className="border border-gray-400">
                    DIST.MANAGER,WB SC,ST&amp; OBC D&amp;FC
                  </td>

                  <td className="border border-gray-400">24792067</td>
                  <td className="border border-gray-400">
                    dmscst24pgs@gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">21</td>
                  <td className="border border-gray-400">UTTAR DINAJPUR</td>
                  <td className="border border-gray-400">DULEN ROY</td>
                  <td className="border border-gray-400">
                    DIST.MANAGER,WB SC,ST&amp; OBC D&amp;FC
                  </td>

                  <td className="border border-gray-400">
                    03523-246046/246082
                  </td>
                  <td className="border border-gray-400">sctcud@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/** Main Section */}
        <Footer />
      </div>
    </>
  );
}

export default Contacts;
