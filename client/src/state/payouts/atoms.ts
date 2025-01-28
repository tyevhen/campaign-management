import { atom } from "jotai";
import { Payout } from "../../types/payout";
import PayoutService from "../../services/payout.service";
import httpClient from "../../services/httpClient";

const payoutService = new PayoutService(httpClient);

export const payoutsAtom = atom<Payout[] | []>([]);

export const getPayoutsAtom = atom(
  (get) => get(payoutsAtom),
  async (_get, set) => {
    const data = await payoutService.getAll();
    set(payoutsAtom, data);
  }
);
