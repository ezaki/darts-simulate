import React, {FC, useState} from 'react';

const InfoPopup: FC = () => {
  const [show, setShow] = useState(false)

  if (show) {
    return (
      <div
        className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center
         outline-none bg-no-repeat bg-center bg-cover bg-black bg-opacity-60 p-8"
        onClick={() => setShow(false)}
      >
        <div
          className="relative mx-auto my-auto max-h-full rounded shadow bg-white p-4 overflow-y-auto"
          onClick={(event) => event.stopPropagation()}
        >
          <div>
            <p
              className="text-lg mb-4"
            >
              ダーツシミュレーション
            </p>
            <p
              className="mb-4"
            >
              作成者<br/>
              Ezaki Takato (
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/takato_ezaki"
                className="text-blue-500 underline"
              >
                @takato_ezaki
              </a>)
            </p>
            <div
              className="border-t-2 my-2"
            />
            <p
              className="mb-2"
            >
              ダーツの挙動を 3D 空間でシミュレーションするアプリです。
            </p>
            <p
              className="mb-2"
            >
              シミュレーション結果については簡易的かつ「それっぽい」挙動を実現しているもののため、<br/>
              実際の挙動とは異なるものが含まれます。
            </p>
            <p
              className="mb-2"
            >
              参考程度かつホビー的な目的にのみご利用ください。
            </p>
            <p
              className="mb-2"
            >
              継続的に開発しているものではないため、要望やバグ報告をいただいてもご対応できない場合があります。
            </p>
            <div
              className="border-t-2 my-2"
            />
            <p
              className="mb-2"
            >
              シミュレーション時の時間は 10 分の 1 の速度で進むようになっています。<br/>
              (リアルタイムだとボードまでの到達時間が早いため)
            </p>
            <p
              className="mb-2"
            >
              アウトボードの場合は、ダーツが画面外に飛び出す場合があります。
            </p>
            <p
              className="mb-2"
            >
              ボードサイズは一般的なソフトダーツのサイズに合わせています。
            </p>
            <p
              className="mb-2"
            >
              初速度にはマイナスも指定することができます。
            </p>
            <div
              className="border-t-2 my-2"
            />
            <p
              className="text-sm text-center text-gray-500 mt-6"
            >
              &copy; 2021 Ezaki Takato
            </p>
          </div>
          <button
            className="absolute top-0 right-0 rounded-full font-bold text-3xl mt-1 mr-3 border-gray-400"
            onClick={() => setShow(false)}
          >
            ×
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      className="absolute bottom-0 left-0 mb-1 ml-1 w-8 h-8 rounded-full shadow bg-indigo-400 text-white"
      onClick={() => setShow(true)}
    >
      ?
    </button>
  )
};

export default InfoPopup;
