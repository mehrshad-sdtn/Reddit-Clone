function BoardHeader() {
  return (
    <>
      <div className="h-20 bg-cover" style={{backgroundImage:'url("https://styles.redditmedia.com/t5_2qs0q/styles/bannerBackgroundImage_7glcgg5ymxp21.png?width=4000&s=9684bc66e812b8730ad694c3f454da8c00a493d7")'}}>
      </div>
      <div className="bg-reddit_dark-brighter">
        <div className="mx-6 relative flex">
          <div className="h-20 w-20 rounded-full overflow-hidden relative -top-3 border-4 border-white bg-white">
            <img src="https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_5ey8lzmwmxp21.png?width=256&s=5a85d5c682f40e3cf317c560b219585ac0afce78" alt=""/>
          </div>
          <div className="pt-2 pl-4">
            <h1 className="text-gray-300 text-3xl">webdev: reddit for web developers</h1>
            <h5 className="text-gray-500">r/webdev</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export  default BoardHeader;