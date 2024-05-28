var simulation = {};

const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
const formatNumber = new Intl.NumberFormat("pt-BR", options);

const pctOptions = { minimumFractionDigits: 3, maximumFractionDigits: 3 };
const pctFormat = new Intl.NumberFormat("pt-BR", pctOptions);

const pctOptMargem = { minimumFractionDigits: 1, maximumFractionDigits: 1 };
const format_margem = new Intl.NumberFormat("pt-BR", pctOptMargem);

function initializeSections() {
   const numberOfSections = document.querySelectorAll("[id^='calcForm-']").length;
   for (let i = 1; i <= numberOfSections; i++) {
      getValuesForm(i);
   }
}

function getValuesForm(numberSimulation) {
   var orgiem_destino = document.getElementById("origem-destino-" + numberSimulation);
   var form = document.getElementById("calcForm-" + numberSimulation);
   var inputs = form.getElementsByTagName("input");

   for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("change", function (event) {
         for (let i = 0; i < form.elements.length; i++) {
            const field = form.elements[i];
            simulation[field.name] = field.value;
         }
         getOrigemDestino(orgiem_destino.value, numberSimulation);
      });
   }
}

function calcForm(numberSimulation, infoRegimes, infoImpostos, infosEstaduais) {
   var estornoCreditoIcms = 0,
      vlEstorno = 0,
      baseIcmsStAt = 0,
      baseIcmsSt = 0,
      pctIcmsSaida,
      baseIcmsSaidaAt,
      pctIcmsStAt = 0,
      pct_PisCofins,
      pctPisCofinsAt,
      vlPisCofinsAt = 0,
      receitaLiqAt = 0,
      vlIcmsSaida = 0,
      vlIcmsSt = 0,
      vlIcmsStAt = 0,
      custoAntesSt = 0,
      totalCreditoIcms = 0,
      credPresumido = 0,
      creditoTributario = 0,
      credIcms = 0,
      vlPisCofinsPv = 0,
      vlIcmsSaidaPv = 0,
      pctMgAt,
      pctMvaAt,
      precoVendaAt;

   const price_list = document.getElementById(numberSimulation + "-price-list");
   const vl_encargo = document.getElementById(numberSimulation + "-vl-encargo");
   const gsv = document.getElementById(numberSimulation + "-gsv");
   const vl_tmi_on = document.getElementById(numberSimulation + "-vl-tmi-on");
   const niv = document.getElementById(numberSimulation + "-niv");
   const pct_encargo = document.getElementById(numberSimulation + "-pct-encargo");
   const pct_tmi_on = document.getElementById(numberSimulation + "-pct-tmi-on");
   const pct_mva = document.getElementById(numberSimulation + "-pct-mva");
   const base_icms_st = document.getElementById(numberSimulation + "-vl-base-icms-st");
   const pct_ipi = document.getElementById(numberSimulation + "-pct-ipi");
   const vl_ipi = document.getElementById(numberSimulation + "-vl-ipi");
   const vl_nf_s_st = document.getElementById(numberSimulation + "-vl-nf-s_icms-st");
   const pct_pis_cofins = document.getElementById(numberSimulation + "-pct-pis-cofins");
   const b_pis_cofins = document.getElementById(numberSimulation + "-b-pis-cofins");
   const vl_pis_cofins = document.getElementById(numberSimulation + "-vl-pis-cofins");
   const b_icms = document.getElementById(numberSimulation + "-b-icms");
   const pct_icms = document.getElementById(numberSimulation + "-pct-icms");
   const vl_icms = document.getElementById(numberSimulation + "-vl-icms");
   const vl_Mercadoria = document.getElementById(numberSimulation + "-vl-mercadoria");
   const pct_icms_st = document.getElementById(numberSimulation + "-pct-icms-st");
   const vl_icms_st = document.getElementById(numberSimulation + "-vl-icms-st");
   const vl_nf_total = document.getElementById(numberSimulation + "-vl-nf-total");

   const pct_regime = document.getElementById(numberSimulation + "-pct-regime");
   const vl_regime = document.getElementById(numberSimulation + "-vl-regime");

   const pct_tmi_off = document.getElementById(numberSimulation + "-pct-tmi-off");
   const vl_tmi_off = document.getElementById(numberSimulation + "-vl-tmi-off");
   const cred_pis_cofins = document.getElementById(numberSimulation + "-cred-pis-cofins");
   const pct_credito_presumido = document.getElementById(numberSimulation + "-pct-credito-presumido");
   const cred_presumido = document.getElementById(numberSimulation + "-cred-presumido");
   const cred_icms = document.getElementById(numberSimulation + "-cred-icms");
   const total_cred_icms = document.getElementById(numberSimulation + "-total-cred-icms");

   const custo_antes_st = document.getElementById(numberSimulation + "-custo-antes-st");
   const pct_margem_at = document.getElementById(numberSimulation + "-pct-margem-at");
   const vl_margem_at = document.getElementById(numberSimulation + "-vl-margem-at");
   const receita_liquida_at = document.getElementById(numberSimulation + "-receita-liquida-at");
   const pct_icms_saida = document.getElementById(numberSimulation + "-pct-icms-saida");
   const vl_icms_saida = document.getElementById(numberSimulation + "-vl-icms-saida");
   const area_incentivada = document.getElementById(`area-incentivada-${numberSimulation}`);

   const pct_pis_cofins_at = document.getElementById(numberSimulation + "-pct-pis-cofins-at");
   const vl_pis_cofins_at = document.getElementById(numberSimulation + "-vl-pis-cofins-at");
   const estorno = document.getElementById(numberSimulation + "-estorno");

   const pct_mva_at = document.getElementById(numberSimulation + "-pct-mva-at");
   const base_icms_st_at = document.getElementById(numberSimulation + "-vl-base-icms-st-at");

   const pct_icms_st_at = document.getElementById(numberSimulation + "-pct-icms-st-at");
   const vl_icms_st_at = document.getElementById(numberSimulation + "-vl-icms-st-at");
   const preco_venda_at = document.getElementById(numberSimulation + "-preco-venda-at");
   const pct_markup_at = document.getElementById(numberSimulation + "-pct-markup-at");

   const cred_tributario = document.getElementById(numberSimulation + "-cred-tributario");
   const custo_cliente = document.getElementById(numberSimulation + "-custo-cliente");
   const pct_margem_pv = document.getElementById(numberSimulation + "-pct-margem-pv");
   const vl_margem_pv = document.getElementById(numberSimulation + "-vl-margem-pv");
   const receita_liquida_pv = document.getElementById(numberSimulation + "-receita-liquida-pv");
   const pct_icms_saida_pv = document.getElementById(numberSimulation + "-pct-icms-saida-pv");
   const vl_icms_saida_pv = document.getElementById(numberSimulation + "-vl-icms-saida-pv");

   const pct_pis_cofins_pv = document.getElementById(numberSimulation + "-pct-pis-cofins-pv");
   const vl_pis_cofins_pv = document.getElementById(numberSimulation + "-vl-pis-cofins-pv");
   const preco_venda_pv = document.getElementById(numberSimulation + "-preco-venda-pv");
   const pct_markup_pv = document.getElementById(numberSimulation + "-pct-markup-pv");

   let price = parseFloat(price_list.value.replace(".", "").replace(",", "."));
   let encargo = parseFloat(pct_encargo.value.replace(",", ".").replace("%", "")) / 100;

   async function recalculoDistribuidor(numberSimulation, infoRegimes, infoImpostos, infosEstaduais) {
      // Valor ICMS Saida
      if (infoRegimes != undefined) {
         if (infoRegimes.substituto == "SIM") {
            baseIcmsSaidaAt = receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida);
            vl_icms_saida.value = formatNumber.format(baseIcmsSaidaAt * pctIcmsSaida);
            vlIcmsSaida = baseIcmsSaidaAt * pctIcmsSaida;
         } else {
            if (area_incentivada.value == "NÃO") {
               if (pctMva == 0 && pctRegime == 0 && pctMvaAt == 0) {
                  baseIcmsSaidaAt = receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida);
                  vl_icms_saida.value = formatNumber.format(baseIcmsSaidaAt * pctIcmsSaida);
                  vlIcmsSaida = baseIcmsSaidaAt * pctIcmsSaida;
               } else {
                  vl_icms_saida.value = "0,00";
                  vlIcmsSaida = 0;
               }
            } else {
               if (area_incentivada.value == "SIM") {
                  if (pctMva == 0 && pctMvaAt == 0) {
                     baseIcmsSaidaAt = receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida);
                     vl_icms_saida.value = formatNumber.format(baseIcmsSaidaAt * pctIcmsSaida);
                     vlIcmsSaida = baseIcmsSaidaAt * pctIcmsSaida;
                  } else {
                     vl_icms_saida.value = "0,00";
                     vlIcmsSaida = 0;
                  }
               }
            }
         }
      } else {
         if (pctMva == 0 && pctMvaAt == 0) {
            baseIcmsSaidaAt = receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida);
            vl_icms_saida.value = formatNumber.format(baseIcmsSaidaAt * pctIcmsSaida);
            vlIcmsSaida = baseIcmsSaidaAt * pctIcmsSaida;
         } else {
            vl_icms_saida.value = "0,00";
            vlIcmsSaida = 0;
         }
      }

      // if (infoRegimes != undefined) {
      //    if (infoRegimes.substituto == "SIM") {
      //       vl_icms_saida.value = formatNumber.format((receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida)) * pctIcmsSaida);
      //       vlIcmsSaida = (receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida)) * pctIcmsSaida;
      //    } else {
      //       vl_icms_saida.value = "0,00";
      //       vlIcmsSaida = 0;
      //    }
      // } else {
      //    if (pctMvaAt == 0) {
      //       vl_icms_saida.value = formatNumber.format((receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida)) * pctIcmsSaida);
      //       vlIcmsSaida = (receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida)) * pctIcmsSaida;
      //    } else {
      //       vl_icms_saida.value = "0,00";
      //       vlIcmsSaida = 0;
      //    }
      // }

      // Base ICMS ST Cliente
      if (infoRegimes != undefined) {
         if (infoRegimes.mva_receita_liquida == "SIM") {
            if (pctMvaAt == 0) {
               base_icms_st_at.value = "0,00";
               baseIcmsStAt = 0;
            } else {
               base_icms_st_at.value = formatNumber.format((receitaLiqAt + vlPisCofinsAt + vlIcmsSaida) * (1 + pctMvaAt));
               baseIcmsStAt = (receitaLiqAt + vlPisCofinsAt + vlIcmsSaida) * (1 + pctMvaAt);
            }
         } else {
            if (pctMvaAt == 0) {
               base_icms_st_at.value = "0,00";
               baseIcmsStAt = 0;
            } else {
               base_icms_st_at.value = formatNumber.format(nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2));
               baseIcmsStAt = nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2);
            }
         }
      } else {
         if (pctMvaAt == 0) {
            base_icms_st_at.value = "0,00";
            baseIcmsStAt = 0;
         } else {
            base_icms_st_at.value = formatNumber.format(nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2));
            baseIcmsStAt = nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2);
         }
      }

      // if (infoRegimes != undefined) {
      //    if (infoRegimes.mva_receita_liquida == "SIM") {
      //       if (pctMvaAt == 0) {
      //          base_icms_st_at.value = "0,00";
      //          baseIcmsStAt = 0;
      //       } else {
      //          base_icms_st_at.value = formatNumber.format((receitaLiqAt + vlPisCofinsAt + vlIcmsSaida) * (1 + pctMvaAt));
      //          baseIcmsStAt = (receitaLiqAt + vlPisCofinsAt + vlIcmsSaida) * (1 + pctMvaAt);
      //       }
      //    } else {
      //       if (pauta == 0 && pctMvaAt == 0) {
      //          base_icms_st_at.value = "0,00";
      //          baseIcmsStAt = 0;
      //       } else {
      //          if (pauta == 0) {
      //             base_icms_st_at.value = formatNumber.format(nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2));
      //             baseIcmsStAt = nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2);
      //          }
      //       }
      //    }
      // } else {
      //    base_icms_st_at.value = formatNumber.format(nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2));
      //    baseIcmsStAt = nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2);
      // }

      // R$ ICMS ST Cliente
      if (pctMvaAt == 0) {
         vl_icms_st_at.value = "0,00";
         vlIcmsStAt = 0;
      } else {
         if (infoRegimes !== undefined) {
            if (infoRegimes.substituto == "SIM") {
               vl_icms_st_at.value = formatNumber.format(baseIcmsStAt * pctIcmsStAt - vlIcmsSaida);
               vlIcmsStAt = baseIcmsStAt * pctIcmsStAt - vlIcmsSaida;
            } else {
               if (infoRegimes.red_icms == "NÃO") {
                  reducao = 0;
               } else {
                  reducao = redIcms;
               }
               vl_icms_st_at.value = formatNumber.format(baseIcmsStAt * pctIcmsBaseStCliente - reducao);
               vlIcmsStAt = baseIcmsStAt * pctIcmsBaseStCliente - reducao;
            }
         } else {
            vl_icms_st_at.value = formatNumber.format(baseIcmsStAt * pctIcmsStAt - redIcms);
            vlIcmsStAt = baseIcmsStAt * pctIcmsStAt - redIcms;
         }
      }

      // Estorno
      if (infoRegimes == undefined) {
         estorno.value = "0,00";
         vlEstorno = 0;
      } else {
         if (vlIcmsSaida == 0) {
            estorno.value = "0,00";
            vlEstorno = 0;
         } else {
            estorno.setAttribute("title", `Estorno ICMS?: ${infoRegimes.estorno_icms_va_at}`);
            if (infoRegimes.estorno_icms_va_at == "SIM - CALCULADO" || infoRegimes.estorno_icms_va_at == "SIM - BASE IMPOSTOS") {
               vlEstorno = vlIcmsSaida - (receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida)) * infoRegimes.pct_estorno_icms_va_at;
               if (vlEstorno < 0) {
                  estorno.value = "0,00";
                  vlEstorno = 0;
               } else {
                  estorno.value = formatNumber.format(vlIcmsSaida - (receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida)) * infoRegimes.pct_estorno_icms_va_at);
               }
            } else {
               if (infoRegimes.estorno_icms_va_at == "SIM - PERCENTUAL") {
                  estorno.value = formatNumber.format(vlIcmsSaida * infoRegimes.pct_estorno_icms_va_at);
                  vlEstorno = vlIcmsSaida * infoRegimes.pct_estorno_icms_va_at;
               } else {
                  if (credPresumido == 0) {
                     estorno.value = "0,00";
                     vlEstorno = 0;
                  } else {
                     if (infoRegimes.substituto == "NÃO") {
                        estorno.value = "0,00";
                        vlEstorno = 0;
                     } else {
                        estorno.value = formatNumber.format(totalCreditoIcms - vlIcmsSaida);
                        vlEstorno = totalCreditoIcms - vlIcmsSaida;
                     }
                  }
               }
            }
         }
      }
      // if (infoRegimes == undefined) {
      //    estorno.value = "0,00";
      //    vlEstorno = 0;
      // } else {
      //    if (vlIcmsSaida == 0) {
      //       estorno.value = "0,00";
      //       vlEstorno = 0;
      //    } else {
      //       estorno.setAttribute("title", `Estorno ICMS?: ${infoRegimes.estorno_icms_va_at}`);
      //       if (infoRegimes.estorno_icms_va_at == "SIM - CALCULADO" || infoRegimes.estorno_icms_va_at == "SIM - BASE IMPOSTOS") {
      //          estorno.value = formatNumber.format(vlIcmsSaida - (receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida)) * infoRegimes.pct_estorno_icms_va_at);
      //          vlEstorno = vlIcmsSaida - (receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida)) * infoRegimes.pct_estorno_icms_va_at;
      //       } else {
      //          if (infoRegimes.estorno_icms_va_at == "Sim - Percentual") {
      //             estorno.value = formatNumber.format(vlIcmsSaida * infoRegimes.pct_estorno_icms_va_at);
      //             vlEstorno = vlIcmsSaida * infoRegimes.pct_estorno_icms_va_at;
      //          } else {
      //             if (credPresumido == 0) {
      //                estorno.value = "0,00";
      //                vlEstorno = 0;
      //             } else {
      //                if (infoRegimes.substituto == "NÃO") {
      //                   estorno.value = "0,00";
      //                   vlEstorno = 0;
      //                } else {
      //                   estorno.value = formatNumber.format(totalCreditoIcms - vlIcmsSaida);
      //                   vlEstorno = totalCreditoIcms - vlIcmsSaida;
      //                }
      //             }
      //          }
      //       }
      //    }
      // }

      // Preço Venda Atacado
      if (infoRegimes == undefined) {
         preco_venda_at.value = formatNumber.format(receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno);
         precoVendaAt = receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno;
      } else {
         if (infoRegimes.substituto == "SIM" && infoRegimes.estorno_icms_va_at == "NÃO") {
            preco_venda_at.value = formatNumber.format(vlIcmsStAt + receitaLiqAt + vlPisCofinsAt + vlIcmsSaida + vlEstorno);
            precoVendaAt = vlIcmsStAt + receitaLiqAt + vlPisCofinsAt + vlIcmsSaida + vlEstorno;
         } else {
            if (infoRegimes.substituto == "SIM") {
               preco_venda_at.value = formatNumber.format(vlIcmsStAt + receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno);
               precoVendaAt = vlIcmsStAt + receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno;
            } else {
               preco_venda_at.value = formatNumber.format(receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno);
               precoVendaAt = receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno;
            }
         }
      }
   }

   // Valor do Encargo
   vl_encargo.value = formatNumber.format(price * encargo);

   // GSV
   gsv.value = formatNumber.format(price + price * encargo);
   let vl_gsv = price + price * encargo;

   let pct_desc = parseFloat(pct_tmi_on.value.replace(",", ".").replace("%", "")) / 100;
   vl_tmi_on.value = formatNumber.format(vl_gsv * pct_desc);
   let vlTmiOn = vl_gsv * pct_desc;

   niv.value = formatNumber.format(vl_gsv - vlTmiOn);
   let vlNiv = vl_gsv - vlTmiOn;

   // Calc Pis/Cofins NF Unilever
   pct_PisCofins = parseFloat(pct_pis_cofins.value.replace(",", ".").replace("%", "")) / 100;
   b_pis_cofins.value = formatNumber.format(vlNiv / (1 - pct_PisCofins));

   let basePisCofins = vlNiv / (1 - pct_PisCofins);

   vl_pis_cofins.value = formatNumber.format(basePisCofins * pct_PisCofins);
   let vlPisCofins = basePisCofins * pct_PisCofins;

   pctPisCofinsAt = parseFloat(pct_pis_cofins_at.value.replace(",", ".").replace("%", "")) / 100;

   // Calc ICMS NF Unilever
   let pct_ICMS = parseFloat(pct_icms.value.replace(",", ".").replace("%", "")) / 100;
   b_icms.value = formatNumber.format(vlNiv / (1 - pct_PisCofins) / (1 - pct_ICMS));
   let baseIcms = vlNiv / (1 - pct_PisCofins) / (1 - pct_ICMS);
   vl_icms.value = formatNumber.format(baseIcms * pct_ICMS);
   let vlIcms = baseIcms * pct_ICMS;

   vl_Mercadoria.value = formatNumber.format(vlNiv + vlIcms + vlPisCofins);
   let t_Mercadoria = vlNiv + vlIcms + vlPisCofins;

   // calcular IPI
   let pct_IPI = parseFloat(pct_ipi.value.replace(",", ".").replace("%", "")) / 100;
   vl_ipi.value = formatNumber.format(t_Mercadoria * pct_IPI);
   let vlIpi = t_Mercadoria * pct_IPI;

   vl_nf_s_st.value = formatNumber.format(t_Mercadoria + vlIpi);
   let nfSemIcmsSt = t_Mercadoria + vlIpi;

   // calcular NF

   // % MVA

   if (infoRegimes != undefined) {
      if (infoRegimes.substituto == "SIM") {
         pct_mva.value = "0,00%";
      }
   } else {
      if (infoImpostos.st_nf == "CLIENTE") {
         pct_mva.value = "0,00%";
      } else {
         let pauta = 0; // Posteriormente, ajustar valor da Pauta de acordo com Banco de Dados
         if (pauta == 0) pct_mva.value = infoImpostos.pct_mva * 100;
      }
   }

   // % ICMS ST
   if (infoRegimes !== undefined) {
      if (infoRegimes.reducao_icms_interno_va_at === "SIM") {
         if (infoImpostos.pct_icms_interno_efetivo > infoImpostos.pct_icms_interno) {
            pct_icms_st.value = infoImpostos.pct_icms_interno * 100;
         } else {
            pct_icms_st.value = infoImpostos.pct_icms_interno_efetivo * 100;
         }
      } else {
         pct_icms_st.value = infoImpostos.pct_icms_interno_original * 100;
      }
   } else {
      pct_icms_st.value = infoImpostos.pct_icms_interno_original * 100;
   }

   // % ICMS Saída VA
   if (infoRegimes !== undefined) {
      if (infoRegimes.reducao_icms_saida_va_at == "NÃO") {
         pct_icms_saida.value = infoImpostos.pct_icms_interno * 100;
      } else {
         pct_icms_saida.value = infoImpostos.pct_icms_interno_efetivo * 100;
      }
   } else {
      pct_icms_saida.value = infoImpostos.pct_icms_interno_efetivo * 100;
   }

   let pctMva = parseFloat(pct_mva.value.replace(",", ".").replace("%", "")) / 100;
   let pctIcmsSt = parseFloat(pct_icms_st.value.replace(",", ".").replace("%", "")) / 100;

   if (pctMva == 0) {
      base_icms_st.value = "0,00";
      baseIcmsSt = 0;
   } else {
      base_icms_st.value = formatNumber.format(nfSemIcmsSt * (1 + pctMva));
      baseIcmsSt = nfSemIcmsSt * (1 + pctMva);
   }

   if (pctMva > 0 && pctIcmsSt > 0) {
      vl_icms_st.value = formatNumber.format(pctIcmsSt * baseIcmsSt - vlIcms);
      vlIcmsSt = pctIcmsSt * baseIcmsSt - vlIcms;
   } else {
      vl_icms_st.value = "0,00";
      vlIcmsSt = 0;
   }

   vl_nf_total.value = formatNumber.format(nfSemIcmsSt + vlIcmsSt);
   let vlNfTotal = nfSemIcmsSt + vlIcmsSt;

   // calcular Valores Distribuidor

   // Regime Estado
   let pctRegime = parseFloat(pct_regime.value.replace(",", ".").replace("%", "")) / 100;
   vl_regime.value = formatNumber.format(pctRegime * vlNfTotal);
   let vlRegime = pctRegime * vlNfTotal;

   // TMI OFF
   let pctOff = parseFloat(pct_tmi_off.value.replace(",", ".").replace("%", "")) / 100;

   vl_tmi_off.value = formatNumber.format(pctOff * vlNiv);
   let vlTmiOff = pctOff * vlNiv;

   // Crédito Pis/Cofins
   cred_pis_cofins.value = vl_pis_cofins.value;

   let pctCreditoPresumido = parseFloat(pct_credito_presumido.value.replace(",", ".").replace("%", "")) / 100;

   // Crédito Presumido
   if (infoRegimes != undefined) {
      vl_regime.setAttribute("title", `Vira Custo: ${infoRegimes.vira_custo}`);
      cred_presumido.setAttribute("title", `Capturar Benefício Fiscal Cliente?: ${infoRegimes.capturar_beneficio_fiscal_cliente}`);
      if (infoRegimes.bc_credito_presumido_st_cliente == "SIM") {
         cred_presumido.value = pctCreditoPresumido * baseIcmsStAt;
         credPresumido = pctCreditoPresumido * baseIcmsStAt;
      } else {
         if (pctCreditoPresumido == 0 || pctIcmsSt == 0) {
            cred_presumido.value = "0,00";
            credPresumido = 0;
         } else {
            cred_presumido.value = formatNumber.format(vlNfTotal * (1 + pctCreditoPresumido) * pctIcmsSt - vlIcms - vlRegime);
            credPresumido = vlNfTotal * (1 + pctCreditoPresumido) * pctIcmsSt - vlIcms - vlRegime;
         }
      }
   }

   // % MVA AT
   let pauta = 0;
   if (pauta !== 0 || pctMva !== 0) {
      pct_mva_at.value = "0,00";
   }

   if (infoRegimes !== undefined) {
      if (infoRegimes.substituto == "SIM") {
         if (infoRegimes.ajustar_mva == "SIM") {
            pct_mva_at.value = infoImpostos.pct_mva_original * 100;
         } else if (infoRegimes.mva_exclusivo === "SIM") {
            pct_mva_at.value = infoImpostos.pct_mva_exclusivo * 100;
         } else {
            if (infoRegimes.mva_estadual == "SIM") {
               pct_mva_at.value = infosEstaduais.pct_mva * 100;
            } else {
               pct_mva_at.value = infoImpostos.pct_mva * 100;
            }
         }
      }
   } else {
      if (infoImpostos.st_nf === "CLIENTE") {
         pct_mva_at.value = infoImpostos.pct_mva * 100;
      }
   }

   pctMvaAt = parseFloat(pct_mva_at.value.replace(",", ".").replace("%", "")) / 100;

   // Crédito ICMS
   if (infoRegimes != undefined) {
      if (infoRegimes.cred_icms == "NÃO") {
         cred_icms.value = "0,00";
         credIcms = 0;
      } else {
         if (pctMva == 0 && pctMvaAt == 0) {
            cred_icms.value = vl_icms.value;
            credIcms = vlIcms;
         } else {
            if ((infoRegimes.substituto = "SIM")) {
               cred_icms.value = vl_icms.value;
               credIcms = vlIcms;
            } else {
               cred_icms.value = "0,00";
               credIcms = 0;
            }
         }
      }
   } else {
      if (pctMva == 0 && pctMvaAt == 0) {
         cred_icms.value = vl_icms.value;
         credIcms = vlIcms;
      } else {
         cred_icms.value = "0,00";
         credIcms = 0;
      }
   }

   // Custo Antes da ST
   let credPisCofins = vlPisCofins;

   // Estorno Crédito ICMS
   if (infoRegimes == undefined) {
      estornoCreditoIcms = 0;
   } else {
      if (infoRegimes.reducao_icms_interno_va_at == "SIM") {
         if (pctMva == 0 && pct_ICMS > infoRegimes.pct_limite_credito_icms) {
            estornoCreditoIcms = vlIcms - baseIcms * infoRegimes.pct_limite_credito_icms;
         } else {
            estornoCreditoIcms = 0;
         }
      } else {
         if (infoRegimes.credito_icms == "NÃO") {
            estornoCreditoIcms = 0;
         }
      }
   }

   if (infoRegimes !== undefined) {
      if (infoRegimes.vira_custo == "NÃO") {
         total_cred_icms.value = formatNumber.format(vlRegime + credPresumido + credIcms - estornoCreditoIcms);
         totalCreditoIcms = vlRegime + credPresumido + credIcms - estornoCreditoIcms;
      } else {
         total_cred_icms.value = formatNumber.format(credPresumido + credIcms - estornoCreditoIcms);
         totalCreditoIcms = credPresumido + credIcms - estornoCreditoIcms;
      }
   } else {
      total_cred_icms.value = formatNumber.format(credPresumido + credIcms - estornoCreditoIcms);
      totalCreditoIcms = credPresumido + credIcms - estornoCreditoIcms;
   }

   let bsRed2 = 0;

   // bsRed2
   if (infoImpostos.st_nf == "CLIENTE") {
      if (pauta == 0) {
         bsRed2 = infoImpostos.pct_bs_red;
      } else {
         bsRed2 = 0;
      }
   } else {
      bsRed2 = 0;
   }

   let pctRedIcms = 0;

   // pctRedIcms
   if (infoImpostos.st_nf == "CLIENTE") {
      if (pauta == 0) {
         pctRedIcms = infoImpostos.pct_red_icms;
      } else {
         pctRedIcms = 0;
      }
   } else {
      pctRedIcms = 0;
   }

   // R$ Red. ICMS
   let redIcms = 0;

   if (pctMvaAt == 0) {
      redIcms = 0;
   } else {
      redIcms = vlIcms * (1 - pctRedIcms);
   }

   pctIcmsSaida = parseFloat(pct_icms_saida.value.replace(",", ".").replace("%", "")) / 100;

   // Valor ICMS Saida
   if (infoRegimes != undefined) {
      if (infoRegimes.substituto == "SIM") {
         baseIcmsSaidaAt = receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida);
         vl_icms_saida.value = formatNumber.format(baseIcmsSaidaAt * pctIcmsSaida);
         vlIcmsSaida = baseIcmsSaidaAt * pctIcmsSaida;
      } else {
         if (area_incentivada.value == "NÃO") {
            if (pctMva == 0 && pctRegime == 0 && pctMvaAt == 0) {
               baseIcmsSaidaAt = receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida);
               vl_icms_saida.value = formatNumber.format(baseIcmsSaidaAt * pctIcmsSaida);
               vlIcmsSaida = baseIcmsSaidaAt * pctIcmsSaida;
            } else {
               vl_icms_saida.value = "0,00";
               vlIcmsSaida = 0;
            }
         } else {
            if (area_incentivada.value == "SIM") {
               if (pctMva == 0 && pctMvaAt == 0) {
                  baseIcmsSaidaAt = receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida);
                  vl_icms_saida.value = formatNumber.format(baseIcmsSaidaAt * pctIcmsSaida);
                  vlIcmsSaida = baseIcmsSaidaAt * pctIcmsSaida;
               } else {
                  vl_icms_saida.value = "0,00";
                  vlIcmsSaida = 0;
               }
            }
         }
      }
   } else {
      if (pctMva == 0 && pctMvaAt == 0) {
         baseIcmsSaidaAt = receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida);
         vl_icms_saida.value = formatNumber.format(baseIcmsSaidaAt * pctIcmsSaida);
         vlIcmsSaida = baseIcmsSaidaAt * pctIcmsSaida;
      } else {
         vl_icms_saida.value = "0,00";
         vlIcmsSaida = 0;
      }
   }

   let pctIcmsBaseStCliente = 0;

   if (pctMvaAt == 0) {
      pctIcmsBaseStCliente = "0,00%";
   } else {
      if (infoRegimes !== undefined) {
         if (infoRegimes.reducao_bc_st_cliente == "SIM") {
            pctIcmsBaseStCliente = infoImpostos.pct_icms_interno_efetivo;
         } else {
            pctIcmsBaseStCliente = infoImpostos.pct_icms_interno;
         }
      } else {
         pctIcmsBaseStCliente = infoImpostos.pct_icms_interno;
      }
   }

   // % ICMS ST Cliente
   if (pctMvaAt == 0) {
      pct_icms_st_at.value = "0,00%";
   } else {
      if (infoRegimes !== undefined) {
         if (infoRegimes.reducao_icms_st_cliente == "SIM") {
            pct_icms_st_at.value = infoImpostos.pct_icms_interno_efetivo * 100;
         } else {
            pct_icms_st_at.value = infoImpostos.pct_icms_interno * 100;
         }
      } else {
         pct_icms_st_at.value = infoImpostos.pct_icms_interno * 100;
      }
   }

   pctIcmsStAt = parseFloat(pct_icms_st_at.value.replace(",", ".").replace("%", "")) / 100;

   let reducao = 0;

   // Base ICMS ST Cliente
   if (infoRegimes != undefined) {
      if (infoRegimes.mva_receita_liquida == "SIM") {
         if (pctMvaAt == 0) {
            base_icms_st_at.value = "0,00";
            baseIcmsStAt = 0;
         } else {
            base_icms_st_at.value = formatNumber.format((receitaLiqAt + vlPisCofinsAt + vlIcmsSaida) * (1 + pctMvaAt));
            baseIcmsStAt = (receitaLiqAt + vlPisCofinsAt + vlIcmsSaida) * (1 + pctMvaAt);
         }
      } else {
         if (pctMvaAt == 0) {
            base_icms_st_at.value = "0,00";
            baseIcmsStAt = 0;
         } else {
            base_icms_st_at.value = formatNumber.format(nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2));
            baseIcmsStAt = nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2);
         }
      }
   } else {
      if (pctMvaAt == 0) {
         base_icms_st_at.value = "0,00";
         baseIcmsStAt = 0;
      } else {
         base_icms_st_at.value = formatNumber.format(nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2));
         baseIcmsStAt = nfSemIcmsSt * (1 + pctMvaAt) * (1 - bsRed2);
      }
   }

   // Estorno
   if (infoRegimes == undefined) {
      estorno.value = "0,00";
      vlEstorno = 0;
   } else {
      if (vlIcmsSaida == 0) {
         estorno.value = "0,00";
         vlEstorno = 0;
      } else {
         estorno.setAttribute("title", `Estorno ICMS?: ${infoRegimes.estorno_icms_va_at}`);
         if (infoRegimes.estorno_icms_va_at == "SIM - CALCULADO" || infoRegimes.estorno_icms_va_at == "SIM - BASE IMPOSTOS") {
            vlEstorno = vlIcmsSaida - (receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida)) * infoRegimes.pct_estorno_icms_va_at;
            if (vlEstorno < 0) {
               estorno.value = "0,00";
               vlEstorno = 0;
            } else {
               estorno.value = formatNumber.format(vlIcmsSaida - (receitaLiqAt / (1 - pctPisCofinsAt) / (1 - pctIcmsSaida)) * infoRegimes.pct_estorno_icms_va_at);
            }
         } else {
            if (infoRegimes.estorno_icms_va_at == "SIM - PERCENTUAL") {
               estorno.value = formatNumber.format(vlIcmsSaida * infoRegimes.pct_estorno_icms_va_at);
               vlEstorno = vlIcmsSaida * infoRegimes.pct_estorno_icms_va_at;
            } else {
               if (credPresumido == 0) {
                  estorno.value = "0,00";
                  vlEstorno = 0;
               } else {
                  if (infoRegimes.substituto == "NÃO") {
                     estorno.value = "0,00";
                     vlEstorno = 0;
                  } else {
                     estorno.value = formatNumber.format(totalCreditoIcms - vlIcmsSaida);
                     vlEstorno = totalCreditoIcms - vlIcmsSaida;
                  }
               }
            }
         }
      }
   }

   // R$ ICMS ST Cliente
   if (pctMvaAt == 0) {
      vl_icms_st_at.value = "0,00";
      vlIcmsStAt = 0;
   } else {
      if (infoRegimes !== undefined) {
         if (infoRegimes.substituto == "SIM") {
            vl_icms_st_at.value = formatNumber.format(baseIcmsStAt * pctIcmsStAt - vlIcmsSaida);
            vlIcmsStAt = baseIcmsStAt * pctIcmsStAt - vlIcmsSaida;
         } else {
            if (infoRegimes.red_icms == "NÃO") {
               reducao = 0;
            } else {
               reducao = redIcms;
            }
            vl_icms_st_at.value = formatNumber.format(baseIcmsStAt * pctIcmsBaseStCliente - reducao);
            vlIcmsStAt = baseIcmsStAt * pctIcmsBaseStCliente - reducao;
         }
      } else {
         vl_icms_st_at.value = formatNumber.format(baseIcmsStAt * pctIcmsStAt - redIcms);
         vlIcmsStAt = baseIcmsStAt * pctIcmsStAt - redIcms;
      }
   }

   // Custo Antes da ST
   if (infoRegimes !== undefined) {
      if (infoRegimes.substituto == "SIM") {
         custo_antes_st.value = formatNumber.format(vlNfTotal + vlRegime - vlTmiOff - totalCreditoIcms - credPisCofins);
         custoAntesSt = vlNfTotal + vlRegime - vlTmiOff - totalCreditoIcms - credPisCofins;
      } else {
         custo_antes_st.value = formatNumber.format(vlNfTotal + vlRegime - vlTmiOff - totalCreditoIcms - credPisCofins + vlIcmsStAt);
         custoAntesSt = vlNfTotal + vlRegime - vlTmiOff - totalCreditoIcms - credPisCofins + vlIcmsStAt;
      }
   } else {
      custo_antes_st.value = formatNumber.format(vlNfTotal + vlRegime - vlTmiOff - totalCreditoIcms - credPisCofins + vlIcmsStAt);
      custoAntesSt = vlNfTotal + vlRegime - vlTmiOff - totalCreditoIcms - credPisCofins + vlIcmsStAt;
   }

   // Receita Líquida
   pctMgAt = parseFloat(pct_margem_at.value.replace(",", ".").replace("%", "")) / 100;

   receita_liquida_at.value = formatNumber.format(custoAntesSt / (1 - pctMgAt));
   receitaLiqAt = custoAntesSt / (1 - pctMgAt);

   // Margem Atacado
   vl_margem_at.value = formatNumber.format(receitaLiqAt - custoAntesSt);

   // Valor Pis/Cofins
   vl_pis_cofins_at.value = formatNumber.format((receitaLiqAt / (1 - pctPisCofinsAt)) * pctPisCofinsAt);
   vlPisCofinsAt = (receitaLiqAt / (1 - pctPisCofinsAt)) * pctPisCofinsAt;

   // Preço Venda Atacado
   if (infoRegimes == undefined) {
      preco_venda_at.value = formatNumber.format(receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno);
      precoVendaAt = receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno;
   } else {
      if (infoRegimes.substituto == "SIM" && infoRegimes.estorno_icms_va_at == "NÃO") {
         preco_venda_at.value = formatNumber.format(vlIcmsStAt + receitaLiqAt + vlPisCofinsAt + vlIcmsSaida + vlEstorno);
         precoVendaAt = vlIcmsStAt + receitaLiqAt + vlPisCofinsAt + vlIcmsSaida + vlEstorno;
      } else {
         if (infoRegimes.substituto == "SIM") {
            preco_venda_at.value = formatNumber.format(vlIcmsStAt + receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno);
            precoVendaAt = vlIcmsStAt + receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno;
         } else {
            preco_venda_at.value = formatNumber.format(receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno);
            precoVendaAt = receitaLiqAt + vlPisCofinsAt + vlIcmsSaida - vlEstorno;
         }
      }
   }

   const recalculo = async () => {
      await recalculoDistribuidor(numberSimulation, infoRegimes, infoImpostos, infosEstaduais);
   };

   recalculo();

   pct_markup_at.value = (precoVendaAt / vlNfTotal - 1) * 100;

   // Calcular Valores Pequeno Varejo
   let mkupVa = parseFloat(pct_markup_pv.value.replace(",", ".").replace("%", "")) / 100;

   if (mkupVa != 0) {
      if (pctMva == 0 && pctMvaAt == 0) {
         cred_tributario.value = formatNumber.format(vlIcmsSaida + vlPisCofinsAt);
         creditoTributario = vlIcmsSaida + vlPisCofinsAt;
      } else {
         cred_tributario.value = formatNumber.format(vlPisCofinsAt);
         creditoTributario = vlPisCofinsAt;
      }

      let pctIcmsSaidaPv = parseFloat(pct_icms_saida_pv.value.replace(",", ".").replace("%", "")) / 100;

      custo_cliente.value = formatNumber.format(precoVendaAt - creditoTributario);
      let custo_pv = precoVendaAt - creditoTributario;

      vl_pis_cofins_pv.value = formatNumber.format(precoVendaAt - creditoTributario);

      preco_venda_pv.value = formatNumber.format(precoVendaAt * (1 + mkupVa));

      let precoVendaVa = precoVendaAt * (1 + mkupVa);

      if (pctMva == 0 && pctMvaAt == 0) {
         vl_icms_saida_pv.value = formatNumber.format(precoVendaVa * pctIcmsSaidaPv);
         vlIcmsSaidaPv = precoVendaVa * pctIcmsSaidaPv;
      } else {
         vl_icms_saida_pv.value = "0,00";
         vlIcmsSaidaPv = 0;
      }

      let pctPisCofinsPv = parseFloat(pct_pis_cofins_pv.value.replace(",", ".").replace("%", "")) / 100;
      vl_pis_cofins_pv.value = formatNumber.format(pctPisCofinsPv * precoVendaVa);
      vlPisCofinsPv = pctPisCofinsPv * precoVendaVa;

      receita_liquida_pv.value = formatNumber.format(precoVendaVa - vlIcmsSaidaPv - vlPisCofinsPv);
      let receita_pv = precoVendaVa - vlIcmsSaidaPv - vlPisCofinsPv;

      vl_margem_pv.value = formatNumber.format(receita_pv - custo_pv);
      let margem_pv = receita_pv - custo_pv;

      pct_margem_pv.value = format_margem.format((margem_pv / receita_pv) * 100);
   }

   //Formatar Valores dos Inputs
   formatValues();

   function formatValues() {
      price_list.value = formatarNumero(price_list.value);
      pct_encargo.value = formatarPercentual(pct_encargo.value);
      pct_tmi_on.value = formatDescontos(pct_tmi_on.value);
      pct_pis_cofins.value = formatarPercentual(pct_pis_cofins.value);
      pct_pis_cofins_at.value = formatarPercentual(pct_pis_cofins_at.value);
      pct_pis_cofins_pv.value = formatarPercentual(pct_pis_cofins_pv.value);
      pct_credito_presumido.value = formatarPercentual(pct_credito_presumido.value);
      pct_icms.value = formatMargem(pct_icms.value);
      pct_icms_saida.value = formatMargem(pct_icms_saida.value);
      pct_icms_saida_pv.value = formatMargem(pct_icms_saida_pv.value);
      pct_ipi.value = formatarPercentual(pct_ipi.value);
      pct_icms_st.value = formatMargem(pct_icms_st.value);
      pct_mva.value = formatarPercentual(pct_mva.value);
      pct_icms_st_at.value = formatMargem(pct_icms_st_at.value);
      pct_mva_at.value = formatarPercentual(pct_mva_at.value);
      pct_regime.value = formatarPercentual(pct_regime.value);
      pct_tmi_off.value = formatDescontos(pct_tmi_off.value);

      pct_margem_at.value = formatMargem(pct_margem_at.value);
      pct_markup_at.value = formatMargem(pct_markup_at.value);
      pct_markup_pv.value = formatMargem(pct_markup_pv.value);
      pct_margem_pv.value = formatMargem(pct_margem_pv.value);
   }
}

function formatarNumero(number) {
   if (number == 0) return 0;
   let numberInput = parseFloat(number.replace(".", "").replace(",", "."));
   return formatNumber.format(numberInput);
}

function formatarPercentual(percentual) {
   if (percentual == 0) return "0,00%";
   let pctInput = parseFloat(percentual.replace(",", ".").replace("%", "")) / 100;
   return formatNumber.format(pctInput * 100) + "%";
}

function formatDescontos(percentual) {
   if (percentual == 0) return "0,000%";
   let pctInput = parseFloat(percentual.replace(",", ".").replace("%", "")) / 100;
   return pctFormat.format(pctInput * 100) + "%";
}

function formatMargem(percentual) {
   if (percentual == 0) return "0,0%";
   let pctInput = parseFloat(percentual.replace(",", ".").replace("%", "")) / 100;
   return format_margem.format(pctInput * 100) + "%";
}

function addValuesSimulation(values, numberSimulation, valuesSimulation) {
   const price_list = document.getElementById(numberSimulation + "-price-list");
   const pct_encargo = document.getElementById(numberSimulation + "-pct-encargo");
   const pct_tmi_on = document.getElementById(numberSimulation + "-pct-tmi-on");
   const pct_pis_cofins = document.getElementById(numberSimulation + "-pct-pis-cofins");
   const pct_icms = document.getElementById(numberSimulation + "-pct-icms");
   const pct_ipi = document.getElementById(numberSimulation + "-pct-ipi");
   const pct_mva = document.getElementById(numberSimulation + "-pct-mva");
   const pct_icms_st = document.getElementById(numberSimulation + "-pct-icms-st");
   const pct_regime = document.getElementById(numberSimulation + "-pct-regime");
   const pct_tmi_off = document.getElementById(numberSimulation + "-pct-tmi-off");
   const pct_margem_at = document.getElementById(numberSimulation + "-pct-margem-at");
   const pct_pis_cofins_at = document.getElementById(numberSimulation + "-pct-pis-cofins-at");
   const pct_icms_saida = document.getElementById(numberSimulation + "-pct-icms-saida");
   const pct_mva_at = document.getElementById(numberSimulation + "-pct-mva-at");
   const pct_icms_st_at = document.getElementById(numberSimulation + "-pct-icms-st-at");
   const pct_pis_cofins_pv = document.getElementById(numberSimulation + "-pct-pis-cofins-pv");
   const pct_icms_saida_pv = document.getElementById(numberSimulation + "-pct-icms-saida-pv");
   const pct_markup_pv = document.getElementById(numberSimulation + "-pct-markup-pv");

   const orgiem_destino = document.getElementById("origem-destino-" + numberSimulation);

   price_list.value = values[valuesSimulation + "-price-list"];
   pct_encargo.value = values[valuesSimulation + "-pct-encargo"];
   pct_tmi_on.value = values[valuesSimulation + "-pct-tmi-on"];
   pct_pis_cofins.value = values[valuesSimulation + "-pct-pis-cofins"];
   pct_icms.value = values[valuesSimulation + "-pct-icms"];
   pct_ipi.value = values[valuesSimulation + "-pct-ipi"];
   pct_mva.value = values[valuesSimulation + "-pct-mva"];
   pct_icms_st.value = values[valuesSimulation + "-pct-icms-st"];
   pct_regime.value = values[valuesSimulation + "-pct-regime"];
   pct_tmi_off.value = values[valuesSimulation + "-pct-tmi-off"];
   pct_margem_at.value = values[valuesSimulation + "-pct-margem-at"];
   pct_pis_cofins_at.value = values[valuesSimulation + "-pct-pis-cofins-at"];
   pct_icms_saida.value = values[valuesSimulation + "-pct-icms-saida"];
   pct_mva_at.value = values[valuesSimulation + "-pct-mva-at"];
   pct_icms_st_at.value = values[valuesSimulation + "-pct-icms-st-at"];
   pct_pis_cofins_pv.value = values[valuesSimulation + "-pct-pis-cofins-pv"];
   pct_icms_saida_pv.value = values[valuesSimulation + "-pct-icms-saida-pv"];
   pct_markup_pv.value = values[valuesSimulation + "-pct-markup-pv"];

   // fetchRegimesEspeciais(numberSimulation);
   //fetchImpostos(orgiem_destino.value, numberSimulation);
   // calcForm(numberSimulation);
}
