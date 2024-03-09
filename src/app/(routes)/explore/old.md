  {/* <PreviewComp variant={variant} />  */}
                      {/* <div>
                        {parse(variant?.code)}
                      </div> */}

                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html: variant.code
                        }}
                      /> */}

                      {React.createElement('div', { dangerouslySetInnerHTML: { __html: variant.code } })}