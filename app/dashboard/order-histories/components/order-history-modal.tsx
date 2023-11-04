"use client";
import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import { format } from "date-fns";
import Link from "next/link";
import { Order } from "@/types/index";
import OrderHistoryModalTableRow from "./order-history-modal-table-row";
import { useGetOrderById } from "@/hooks/useGetOrderById";

interface Props {
  order: Order;
}

const OrderHistoryModal: FC<Props> = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const { data } = useGetOrderById({ id: order.id });

  const StyleTableTh =
    "border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-1 text-left text-black";

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        className="py-2 px-4"
        size="sm"
      >
        詳細
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader className="flex justify-between">
          <div className="flex gap-3 items-center">
            <div>発注詳細</div>
            <div>
              <Link href={`/dashboard/order-histories/edit/${order.id}`}>
                <Button size="sm" className="px-2 py-1">
                  伝票処理
                </Button>
              </Link>
            </div>
          </div>
          <button>
            <AiOutlineClose onClick={() => setOpen(false)} />
          </button>
        </DialogHeader>
        <DialogBody className="pt-0 ">
          <div className="flex gap-6">
            <div>
              <div className="text-sm">受付番号</div>
              <div className="ml-4 text-black">{order.id}</div>
            </div>
            <div>
              <div className="text-sm">貴社発注ナンバー</div>
              <div className="ml-4 text-black">{order.order_number}</div>
            </div>
          </div>
          <div className="mt-6 flex gap-6">
            <div>
              <div className="text-sm">発注日時</div>
              <div className="ml-4 text-black">
                {format(new Date(order.created_at), "yyyy年MM月dd日 HH時mm分")}
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-6">
            <div>
              <div className="text-sm">送り先</div>
              <div className="ml-4 text-black">
                {order.shipping_addresses?.name}
              </div>
            </div>
          </div>
          <div className="mt-6 h-[calc(100%)] overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={`${StyleTableTh}`}>メーカー</th>
                  <th className={`${StyleTableTh}`}>品番</th>
                  <th className={`${StyleTableTh}`}>品名</th>
                  <th className={`${StyleTableTh}`}>カラー</th>
                  <th className={`${StyleTableTh} text-center`}>サイズ</th>
                  <th className={`${StyleTableTh} text-center`}>受注数</th>
                  <th className={`${StyleTableTh} text-center`}>未出荷数</th>
                  <th className={`${StyleTableTh} text-center`}>出荷数</th>
                  <th className={`${StyleTableTh} text-center`}>二次加工</th>
                  <th className={`${StyleTableTh}`}>コメント</th>
                </tr>
              </thead>
              <tbody>
                {order.order_details?.map((detail) => (
                  <OrderHistoryModalTableRow key={detail.id} detail={detail} />
                ))}
              </tbody>
            </table>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-1">
            <span>閉じる</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default OrderHistoryModal;
